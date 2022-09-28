RegisterServerEvent("rm:playerLoginServer", function(source)
    local player = RMCore.getPlayer(source)
    if player.status == nil or next(player.status) == nil then
        for k, v in pairs(Config.status) do
            player.createStatus(k, v.defaultValue)
        end
    end
end)

RegisterServerEvent("status:decreaseStatus", function(statusType, value)
    local src = source
    local player = RMCore.getPlayer(src)
    local state = Player(src).state
    if player then
        if player.status == nil or next(player.status) == nil then
            for k, v in pairs(Config.status) do
                player.createStatus(k, v.defaultValue)
            end
        end

        local currentValue = player.removeStatus(statusType, value or Config.status[statusType].decreaseValue)
        state:set(statusType, currentValue, true)
        -- print(state[statusType])
    end
end)


RegisterServerEvent("status:increaseStatus", function(statusType, value)
    local src = source
    local player = RMCore.getPlayer(src)
    local state = Player(src).state
    if player then
        if player.status == nil or next(player.status) == nil then
            player.createStatus(k, v.defaultValue)
        end
        if player.status[statusType] > 100 then return end
        local currentValue = player.addStatus(statusType, value)
        state:set(statusType, currentValue, true)
    end
end)
