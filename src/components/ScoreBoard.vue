<template>
    <div class="score-board">
        <div class="apple">
            <img
                src="https://app2556.acapp.acwing.com.cn:4431/static/images/apple.png"
                alt=""
            />
            <div>{{ $store.state.score }}</div>
        </div>
        <div class="cup">
            <img
                src="https://app2556.acapp.acwing.com.cn:4431/static/images/cup.png"
                alt=""
            />
            <div>{{ $store.state.record }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ScoreBoard",
};
</script>

<style scoped>
.score-board {
    height: 8vh;
    background-color: #4a752c;
    display: flex;
    justify-content: space-around;
    user-select: none;
}

.apple {
    display: flex;
    align-items: center;
}

.apple > img {
    width: 6vh;
    height: 6vh;
}

.apple > div {
    color: white;
    font-weight: bold;
    font-size: 2.5vh;
}

.cup {
    display: flex;
    align-items: center;
}

.cup > img {
    width: 5vh;
    height: 5vh;
}

.cup > div {
    color: white;
    font-weight: bold;
    font-size: 2.5vh;
    margin-left: 1vh;
}
</style>