<template>
    <div class="playground">
        <ScoreBoard />
        <GameMap />
    </div>
</template>

<script>
import ScoreBoard from "@/components/ScoreBoard";
import GameMap from "@/components/GameMap";

export default {
    name: "PlayGround",
    components: {
        ScoreBoard,
        GameMap,
    },
};
</script>

<style scoped>
.playground {
    width: 100%;
    height: 100%;
    background-color: #578a34;
}
</style>