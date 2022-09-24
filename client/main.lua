local isFatigue = false
local warmthTags = {
     [265372629] = -1,
     [-1938332139] = 1, -- WARM
     [-821065926] = 2,
     [-923980501] = 3,
     [-1679966367] = 4,
 }
local totalWarm = 0

CreateThread(function()
    while true do
        if IsPedOnMount(cache.ped) or IsPedInAnyVehicle(cache.ped) then
            DisplayRadar(true)
        else
            DisplayRadar(false)
        end
        Wait(1000)
    end
end)


CreateThread(function()
    for i = 1, 12 do
        Citizen.InvokeNative(0xC116E6DF68DCE667, i, 2)
    end
    Wait(5000)
    while Client.isLoading do
        Wait(0)
    end
    SendNUIMessage({
        action = "setStatus",
        data = Config.status
    })
    CreateThread(function()
        while true do
            Wait(1000)
            local stamina = math.floor(Citizen.InvokeNative(0x775A1CA7893AA8B5, cache.ped, Citizen.ResultAsFloat()))
                * 10
            local health = math.floor(GetEntityHealth(cache.ped))

            SendNUIMessage({
                action = "updateStatus",
                data = {
                    stamina = {
                        value = stamina,
                        visible = true
                    },
                    health = {
                        value = health,
                        visible = true
                    }
                }
            })
        end
    end)
    CreateThread(function()
        while true do
            Wait(10000)
            local temp = math.floor(GetTemperatureAtCoords(GetEntityCoords(cache.ped)))
            local warmth = getWarmthNeed(temp)
            local components = GetCurrentPedComponent(cache.ped)
            for _,v in pairs(components) do
                for _, warmthValue in pairs(warmthTags) do
                    if Citizen.InvokeNative(0xFF5FB5605AD56856, v, warmthTag, 1120943070) then -- _ITEM_DATABASE_DOES_ITEM_HAVE_TAG
                        print(v, warmthTags[warmthTag], warmthTag)
                        totalWarm = totalWarm + warmthValue
                    end
                end
            end
            if totalWarm <= warmth and not IsEntityPlayingAnim(cache.ped) then
                local randomDict = math.random(1, #Config.coldAnimations)
                local dict = Config.coldAnimations[randomDict].dict
                local randomAnim = math.random(1, #Config.coldAnimations[randomDict].anims)
                local anim = Config.coldAnimations[randomDict].anims[randomAnim].name
                local duration = math.floor(GetAnimDuration(dict, anim)) * 1000 + 500
                TaskPlayAnim(cache.ped, dict, anim, 8.0, 8.0, duration, 31, 0, false, false, false)
                Wait(duration)
                ClearPedTasks(cache.ped)
            end
        end
    end)
    
    CreateThread(function()
        while true do
            if Client and Client.playerData.status ~= nil then
                for k, v in pairs(Client.playerData.status) do
                    if Config.status[k].lastCheck == nil then
                        Config.status[k].lastCheck = GetGameTimer()
                    end

                    if Config.status[k].lastCheck + Config.status[k].timeBeforeDecrease < GetGameTimer() then
                        TriggerServerEvent("status:decreaseStatus", k)
                        Config.status[k].lastCheck = GetGameTimer() + Config.status[k].timeBeforeDecrease
                    end

                    if v <= 0 then
                        if not isFatigue then
                            startFatigue()
                        end
                    end

                    if v > 0 and isFatigue then isFatigue = false end
                    SendNUIMessage({
                        action = "updateStatus",
                        data = {
                             [k] = {
                                value = v,
                                visible = true
                            }
                        }
                    })
                end
            end
            Wait(1000)
        end
    end)
end)

function getWarmthNeed(temp)
    local warmNeed = 0
    if temp <= 0 then
        warmNeed = 50
    elseif temp > 0 and temp < 10 then
        warmNeed = 30
    elseif temp > 10 and temp < 20 then
        warmNeed = 20
    elseif temp > 20 and temp < 30 then
        warmNeed = 10
    elseif temp > 30 then
        warmNeed = 0
    end
    return warmNeed
end

RegisterNetEvent('status:updateStatus', function(statusType, statusValue)
    if Client.playerData.status[statusType] then
        Client.playerData.status[statusType] = statusValue
    end
end)

RegisterNetEvent('rm_status:create', function(statusType, statusValue)
    if not Client.status[statusType] then
        Client.status[statusType] = statusValue
    end
end)

function GetCurrentPedComponent(ped, category)
    
    local componentsCount = Natives.GetNumComponentsInPed(ped)
    if not componentsCount then
        return 0
    end
    local metaPedType = Natives.GetMetaPedType(ped)
    local dataStruct = DataView.ArrayBuffer(6 * 8)
    local fullPedComponents = {}
    for i = 0, componentsCount, 1 do
        local componentHash = Natives.GetShopPedComponentAtIndex(ped, i, true, dataStruct:Buffer(), dataStruct:Buffer())
        if componentHash then
            local componentCategoryHash = Natives.GetShopPedComponentCategory(componentHash, metaPedType, true)
            if category ~= nil then
                if category == componentCategoryHash then
                    return componentHash
                end
            else
                fullPedComponents[componentCategoryHash] = componentHash
            end
        end
    end
    if category then
        return 0
    end
    return fullPedComponents
end

if Config.debug then
    AddEventHandler('onResourceStart', function(resource)
        if GetCurrentResourceName() == resource then
            Client.playerData = exports.rm_core:getPlayerData()
            Client.isLoading = false
        end
    end)
end


function startFatigue()
    while isFatigue do
        Wait(5000)
        print('On fatigue')
    end
end


