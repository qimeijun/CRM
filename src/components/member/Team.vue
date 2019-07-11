<template>
    <section class="member-team">
        <div class="member-team__list">
            <div class="member-team__list-name">
                <div v-if="Object.keys(teamInfo).length == 0" 
                    class="member-team__list-name--no" @click="addTeam">
                    {{ $t("memberInfo.noTeam") }}
                </div>
                <div v-else class="member-team__list-name--data">
                    <div class="operate">
                        <el-dropdown style="color: white;">
                            <span class="el-dropdown-link">
                                {{ $t("memberInfo.operate") }}
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu class="iworku-popper" slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="user-name">{{ teamInfo.name }}</div>
                    <div class="leader">Leader: {{ teamInfo.admin }}</div>
                    <div class="location">
                        <el-avatar :size="50" :src="teamInfo.logo" style="margin-right:10px;"></el-avatar>
                        {{ teamInfo.country }}
                    </div>
                </div>
            </div>
            <div class="member-team__list-member">
                <ul>
                    <template v-if="teamInfo && teamInfo.member && teamInfo.member.length > 0">
                        <li></li>
                    </template>
                    <template v-else>
                        <li></li>
                        <li></li>
                        <li></li>
                    </template>
                </ul>
            </div>
        </div>
        <div class="member-team__statistics"></div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            teamInfo: {
                id: "sdjfskdjf",
                name: "Zhangsan Team",
                admin: "admin",
                country: "越南",
                logo: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
                member: [
                    {
                        name: "lisi",
                        country: "越南",
                        role: "项目经理",
                        time: '2017/01/12',
                        
                    },
                    {
                        name: "lisi23",
                        country: "越南",
                        role: "普通成员",
                        time: '2017/01/12'
                    },
                    {
                        name: "lisi34",
                        country: "越南",
                        role: "普通成员",
                        time: '2017/01/12'
                    },
                    {
                        name: "lisi45",
                        country: "越南",
                        role: "普通成员",
                        time: '2017/01/12'
                    }
                ]
            }
        }
    },
    methods: {
        /**
         *  添加团队
         */
        addTeam() {}
    }
}
</script>
<style lang="scss" scoped>
.member-team {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    &__list {
        flex: 1;
        margin-right: .1rem;
        &-name {
            height:144px;
            background-color: #D4D4D4;
            border-radius: $--default-border-radius;
            
        }
        &-name--no {
            text-align: center; 
            font-size: 18px; 
            color: #7B7B7B;
            line-height: 144px;
            cursor: pointer;
        }
        &-name--data {
            color: $--default-white;
            height: 144px;
            border-radius: $--default-border-radius;
            background:linear-gradient(315deg,rgba(140,0,255,1) 0%,rgba(216,11,30,1) 100%);
            .operate {
                padding-top: 10px;
                text-align: right;
                margin-right: 3%;
                cursor: pointer;
            }
            .user-name {
                margin-left: 10%;
                text-transform:capitalize;
                font-size:24px;
                line-height:50px;
            }
            .user-name:first-letter {
                font-size: 50px;
            }
            .leader {
                margin-left: 10%;
                font-size: 18px;
            }
            .location {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: -25px;
                text-align: right;
                margin-right: 3%;
            }
        }
        
        &-member {
            margin-top: 20px;
            li {
                margin-bottom: 10px;
                height: 88px;
                background-color: #D4D4D4;
                border-radius: $--default-border-radius;
            }
        }
    }
    &__statistics {
        flex: 1;
        height:384px;
        background-color: #D4D4D4;
        border-radius: $--default-border-radius;
    }
}
</style>
