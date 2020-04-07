import { message } from 'antd';
import { saveMatchInfo, ongoingMatchInfo } from '@/services/matchInfo';
import { queryCurrentUser, findUserFightingCapacity } from '@/services/user';
import { findTenAnnouncement } from '@/services/announcement';
import { changeMatch } from '@/services/fightingCapacity';

const Model = {
    namespace: 'monitor',
    state: {
        currentUser: undefined,
        ongoingMatchInfo: [],
        findTenAnnouncement: [],
        changeMatch: [],
        findUserFightingCapacity: [],
    },
    effects: {
        *init(_, { put }) {
            yield put({
                type: 'fetchCurrentUser',
            });
            yield put({
                type: 'ongoingMatchInfo',
            });
            yield put({
                type: 'findTenAnnouncement',
            });
            yield put({
                type: 'changeMatch',
            });
            yield put({
                type: 'findUserFightingCapacity',
            });
        },

        /**
         * 创建比赛
         */
        *saveMatch({ payload }, { call }) {
            yield call(saveMatchInfo, payload);
            message.success('比赛创建成功');
        },

        /**
        * 获取当前用户
        */
        *fetchCurrentUser(_, { call, put }) {
            const response = yield call(queryCurrentUser);
            yield put({
                type: 'save',
                payload: {
                    currentUser: response,
                },
            });
        },

        /**
         * 获取尚未结束的比赛
         */
        *ongoingMatchInfo(_, { call, put }) {
            const response = yield call(ongoingMatchInfo);
            yield put({
                type: 'save',
                payload: {
                    ongoingMatchInfo: Array.isArray(response.data) ? response.data : [],
                },
            });
        },

        /**
         * 获取前十条公告
         */
        *findTenAnnouncement(_, { call, put }) {
            const response = yield call(findTenAnnouncement);
            yield put({
                type: 'save',
                payload: {
                    findTenAnnouncement: Array.isArray(response.announcementDto) ? response.announcementDto : [],
                },
            });
        },

        /**
         * 比赛人数变化数据
         */
        *changeMatch(_, { call, put }) {
            const response = yield call(changeMatch);
            yield put({
                type: 'save',
                payload: {
                    changeMatch: response.list,
                },
            });
        },

        /**
     * 获取战斗力前十
     */
        *findUserFightingCapacity(_, { call, put }) {
            const response = yield call(findUserFightingCapacity);
            yield put({
                type: 'save',
                payload: {
                    findUserFightingCapacity: Array.isArray(response.userDto) ? response.userDto : [],
                },
            });
        },
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },

        clear() {
            return {
                currentUser: undefined,
                ongoingMatchInfo: [],
                findTenAnnouncement: [],
                changeMatch: [],
                findUserFightingCapacity: [],
            };
        },
    },
};
export default Model;
