// takes keyframes and some options. Spits out (time,value) instead of (x,y)
function getSchedule({ nodes, width, height }) {
	return nodes.map((node) => {
		const xPerc = node.x / width;
		// invert it since y starts from top
		const yPerc = 1 - node.y / height;

		return { timePerc: xPerc, value: yPerc };
	});
}

export default getSchedule;
