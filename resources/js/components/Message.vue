<template>
    <div>
        <li class="list-group-item" :class="className">
            <slot></slot>
        </li>
        <span class="badge float-end" :class="badgeClass">{{ user }}</span>
    </div>
</template>

<script>
export default {
    props: [
        'color',
        'user'
    ],
    computed: {
        className() {
            return 'list-group-item-' + this.color
        },
        badgeClass() {
            return 'bg-' + this.color
        }
    },
    mounted() {
        console.log('Component mounted.')
    }
}
</script>
