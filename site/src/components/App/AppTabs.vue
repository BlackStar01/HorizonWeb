<template>
    <div>
        <div class="flex mx-auto space-x-2">
            <button v-for="(t, i) in tabs" :key="i" class="w-full uppercase button" @click="updateTab(i)">
                <p>{{ t.name }}</p>
            </button>
        </div>

        <slot :name="tabs[tab].id" />
    </div>
</template>

<script>
    import router from '@/router'

    export default {
        props: {
            mode: {
                type: String,
                default: 'horizontal',
            },
            type: {
                type: String,
                default: 'button',
            },
            tabs: {
                type: Object,
                default: () => {},
            },
            tab: {
                type: Number,
                default: 0,
            },
        },
        emits: ['update:tab'],
        watch: { $route: 'updateComponent' },
        created() {
            this.updateTab(this.tab)
        },
        methods: {
            getTabFromRoute() {
                return this.tabs.findIndex((t) => t.id === this.$route.params.component)
            },
            updateComponent() {
                if (this.$route.params.component) {
                    const newTab = this.getTabFromRoute()
                    if (newTab !== this.tab) {
                        this.$emit('update:tab', newTab)
                    }
                }
            },
            updateTab(newTab) {
                this.$emit('update:tab', newTab)
                console.log(router)
                router.push('/me/' + this.tabs[newTab].id)
            },
        },
    }
</script>
