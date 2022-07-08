<template>
    <div>
        <li class="list-group-item" :class="className">
            <slot></slot>
            <small id="time">{{ time }}</small>
        </li>
        <span class="badge float-end" :class="badgeClass">{{ user }}</span>
    </div>
</template>

<script>
export default {
    props: [
        'color',
        'user',
        'time'
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
<style scoped>
#time {
    font-size: 8px;
    margin-left: 10px;
    margin-top: 10px;
    color: #000;
}
</style>
