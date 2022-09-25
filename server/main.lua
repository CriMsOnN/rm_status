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
    if player then
        if player.status == nil or next(player.status) == nil then
            for k, v in pairs(Config.status) do
                player.createStatus(k, v.defaultValue)
            end
        end

        player.removeStatus(statusType, value or Config.status[statusType].decreaseValue)
    end
end)


RegisterServerEvent("status:increaseStatus", function(statusType, value)
    local src = source
    local player = RMCore.getPlayer(src)
    if player then
        if player.status == nil or next(player.status) == nil then
            player.createStatus(k, v.defaultValue)
        end
        if player.status[statusType] > 100 then return end
        player.addStatus(statusType, value)
    end
end)
