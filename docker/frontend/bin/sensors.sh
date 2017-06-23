#!/bin/bash
set -e

help() {
		echo 'Uses cli tools free and top to determine current CPU and memory usage'
		echo 'for the telemetry service.'
}

# memory usage in percent
memory() {
		# awk oneliner to get memory usage
		# free -m | awk 'NR==2{printf "Memory Usage: %s/%sMB (%.2f%%)\n", $3,$2,$3*100/$2 }'
		# output:
		# Memory Usage: 15804/15959MB (99.03%)
		local memory=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')
		/bin/containerpilot -putmetric "frontend_memory_percent=$memory"
}

# cpu load
cpu() {
		# oneliner to display cpu load
		# top -bn1 | grep load | awk '{printf "CPU Load: %.2f\n", $(NF-2)}'
		local cpuload=$(uptime | awk '{printf "%.2f", $6}')
		/bin/containerpilot -putmetric "frontend_cpu_load=$cpuload"
}

diskusage() {
		local usage=$(df -P | grep '/$' | awk 'NR=2{print $3}' | sed 's/[^0-9\.]*//g')
		/bin/containerpilot -putmetric "frontend_disk_usage=$usage"
}

diskcapacity() {
		local capacity=$(df -P | grep '/$' | awk 'NR=2{print $2}' | sed 's/[^0-9\.]*//g')
		/bin/containerpilot -putmetric "frontend_disk_capacity=$capacity"
}

cmd=$1
if [ ! -z "$cmd" ]; then
		shift 1
		$cmd "$@"
		exit
fi

help
