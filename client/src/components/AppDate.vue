<template>
	<span :title="dateForHumans()">
		{{ diffForHumans() }}
	</span>
</template>

<script setup>
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'
	import localizedFormat from 'dayjs/plugin/localizedFormat'
	dayjs.extend(relativeTime)
	dayjs.extend(localizedFormat)

	const props = defineProps({
		timestamp: String,
	})

	function diffForHumans() {
		return dayjs(props.timestamp).fromNow()
	}
	function dateForHumans() {
		return dayjs(props.timestamp).format('dd, DD MMMM YYYY')
	}
</script>
