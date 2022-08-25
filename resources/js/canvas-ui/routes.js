import AllPosts from './views/AllPosts';
import AllTags from './views/AllTags';
import AllTopics from './views/AllTopics';
import ShowPost from './views/ShowPost';
import ShowTag from './views/ShowTag';
import ShowTopic from './views/ShowTopic';
import ShowUser from './views/ShowUser';
import Home from './views/Home';

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },

    {
        path: '/posts',
        name: 'posts',
        component: AllPosts,
    },

    {
        path: '/posts/:slug',
        name: 'show-post',
        component: ShowPost,
    },
    {
        path: '/tags',
        name: 'tags',
        component: AllTags,
    },
    {
        path: '/tags/:slug',
        name: 'show-tag',
        component: ShowTag,
    },
    {
        path: '/topics',
        name: 'topics',
        component: AllTopics,
    },
    {
        path: '/topics/:slug',
        name: 'show-topic',
        component: ShowTopic,
    },
    {
        path: '/:id',
        name: 'show-user',
        component: ShowUser,
    },
    {
        path: '*',
        name: 'catch-all',
        redirect: '/canvas-ui',
    },
];
