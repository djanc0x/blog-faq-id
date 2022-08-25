<template>
    <section>
        <page-header />

        <div v-if="isReady" class="mt-5">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 col-md-12 mt-3">
                <h1 class="font-serif">Frequently Asked Question</h1>
                <p class="lead text-secondary">How can i help you?</p>

                <div v-if="topics.length > 0">
                            <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2">
                                <div :key="topic.id" v-for="topic in topics.slice(0, topicsToShow)">
                                    <router-link
                                        :to="{ name: 'show-topic', params: { slug: topic.slug } }"
                                        class="text-decoration-none"
                                    >
                                        <div class="col mb-4">
                                            <div class="card mb-4 shadow-sm">
                                                <div class="card-body">
                                                    <p class="card-text">{{ topic.name }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <router-link :to="{ name: 'topics' }" class="btn btn-outline-danger btn-lg btn-block">
                        More Topic
                    </router-link>
                        </div>

                <main role="main" class="mt-8">
                    <div>
                        <h4 class="my-4 border-bottom mt-5 pb-2">
                            <span class="border-bottom border-dark pb-2">Article</span>
                        </h4>
                        

                        <div :key="`${index}-${post.id}`" v-for="(post, index) in posts.slice(0, postsToShow)">
                            <router-link
                                :to="{ name: 'show-post', params: { slug: post.slug } }"
                                class="text-decoration-none"
                            >
                                <div class="card mb-8 shadow">
                                    <div class="card-body px-4">
                                        <div class="container d-lg-inline-flex align-items-center">
                                            <div v-if="post.featured_image" class="col-12 col-lg-3 p-0">
                                                <img
                                                    :src="post.featured_image"
                                                    :alt="post.featured_image_caption"
                                                    class="rounded w-100"
                                                />
                                            </div>
                                            <section
                                                class="col-12 mt-3 mt-lg-0 px-0 px-lg-3"
                                                :class="post.featured_image ? 'col-lg-9' : ''"
                                            >
                                                <h5 class="card-title text-truncate mb-0">{{ post.title }}</h5>
                                                <p class="card-text text-truncate">{{ post.summary }}</p>
                                                <p class="card-text mb-0 text-secondary">
                                                    {{ post.user.name }}
                                                    <span v-if="post.topic.length"> in {{ post.topic[0].name }} </span>
                                                </p>
                                                <p class="card-text text-secondary">
                                                    {{ moment(post.published_at).format('MMM D, Y') }} —
                                                    {{ post.read_time }}
                                                </p>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        &nbsp;
                        <router-link :to="{ name: 'posts' }" class="btn btn-danger btn-lg btn-block">
                        More Article
                    </router-link>

                        <infinite-loading spinner="spiral" @infinite="fetchPosts">
                            <span slot="no-more" />
                            <div slot="no-results" class="text-left">
                                <div class="my-5">
                                    <p class="lead text-center text-muted mt-5">You have no published posts</p>
                                </div>
                            </div>
                        </infinite-loading>
                    </div>
                </main>
            </div>
        </div>
    </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import NProgress from 'nprogress';
import PageHeader from '../components/PageHeaderComponent';
import isEmpty from 'lodash/isEmpty';

export default {
    name: 'all-posts',

    components: {
        InfiniteLoading,
        PageHeader,
    },

    metaInfo() {
        return {
            title: 'FAQ',
        };
    },

    data() {
        return {
            page: 1,
            posts: [],
            topics: [],
            topicsToShow : 6,
            postsToShow : 5,
            isReady: false,
        };
    },

    async created() {
        await Promise.all([this.fetchPosts()]);
        this.isReady = true;
        NProgress.done();
    },

    async created() {
        await Promise.all([this.fetchTopics()]);
        this.isReady = true;
        NProgress.done();
    },

    methods: {
        fetchPosts($state) {
            if ($state) {
                return this.request()
                    .get('/api/posts', {
                        params: {
                            page: this.page,
                        },
                    })
                    .then(({ data }) => {
                        if (!isEmpty(data) && !isEmpty(data.data)) {
                            this.page += 1;
                            this.posts.push(...data.data);

                            $state.loaded();
                        } else {
                            $state.complete();
                        }

                        if (isEmpty($state)) {
                            NProgress.inc();
                        }
                    })
                    .catch(() => {
                        NProgress.done();
                    });
            }
        },

        fetchTopics() {
            return this.request()
                .get('/api/topics')
                .then(({ data }) => {
                    this.topics = data;
                    NProgress.inc();
                })
                .catch(() => {
                    NProgress.done();
                });
        },
    },
};

</script>
