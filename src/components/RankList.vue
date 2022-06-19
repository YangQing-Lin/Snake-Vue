<template>
    <div class="ranklist">
        <span class="close-ranklist" @click="close_ranklist">x</span>
        <div class="player" v-for="player in players" :key="player.id">
            <div>#{{ player.rank }}</div>
            <div>
                <img :src="player.photo" alt="" />
            </div>
            <div>{{ player.username }}</div>
            <div>{{ player.score }}</div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import $ from "jquery";
import { useStore } from "vuex";

export default {
    name: "RankList",
    setup() {
        const store = useStore();
        let players = ref([]);
        $.ajax({
            url: "https://app2556.acapp.acwing.com.cn:4431/get_ranklist/",
            type: "get",
            headers: {
                Authorization: "Bearer " + this.store.state.access,
            },
            success: (resp) => {
                const new_players = [resp.me, ...resp.all];
                console.log("get rank list success", new_players);
                let id = 0;
                for (let player of new_players) {
                    player.id = id++;
                }
                players.value = new_players;
            },
        });

        const close_ranklist = () => {
            store.commit("updateRanklist", false);
        };

        return {
            players,
            close_ranklist,
        };
    },
};
</script>

<style scoped>
div.ranklist {
    position: absolute;
    width: 30vh;
    height: 44vh;
    background-color: lightblue;
    user-select: none;
}

span.close-ranklist {
    float: right;
    position: absolute;
    right: 0.5vh;
    font-size: 2vh;
    cursor: pointer;
}

div.player:nth-child(2) {
    background-color: #eecb07;
}

div.player {
    width: 100%;
    height: 4vh;
    display: grid;
    grid-template-columns: repeat(4, 7.5vh);
    line-height: 4vh;
}

div.player > div {
    text-align: center;
    color: white;
}

div.player > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
}

div.player > div > img {
    width: 3vh;
    height: 3vh;
    border-radius: 50%;
}

div.player > div:nth-child(3) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    text-align: left;
}
</style>