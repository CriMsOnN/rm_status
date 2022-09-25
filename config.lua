Config = {
    debug = true,
    status = {
        hunger = {
            value = 0,
            visible = true,
            timeBeforeDecrease = 70000,
            decreaseValue = 2,
            defaultValue = 100,
        },
        thirst = {
            value = 0,
            visible = true,
            timeBeforeDecrease = 80000,
            decreaseValue = 1,
            defaultValue = 100
        },
    },
    coldAnimations = {
        [2] = {
            dict = "mech_loco_m@character@arthur@fidgets@weather@snow_cold@unarmed",
            anims = {
                { name = "rub_arms_b" },
                { name = "rub_arms_a" },
                { name = "cough_a" },
                { name = "rub_arms_c" },
            }
        },
        [1] = {
            dict = "amb_wander@upperbody_idles@cold@both_arms@male_a@idle_a",
            anims = {
                { name = "idle_c" },
                { name = "idle_a" },
                { name = "idle_b" }
            }
        }
    }
}
