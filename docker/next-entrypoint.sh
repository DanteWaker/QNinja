#!/bin/sh -e

work_dir="/home/python/qninja"
h_spacer="========="
e_spacer=":::::::::"
a_spacer="---------"
red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
white='\033[0;37m'
reset='\033[0m'

next_setup() {
    cd ${work_dir}/next

    echo "\n${white}${h_spacer} Installing node dependencies ${h_spacer}${reset}\n"
    yarn install
    if [ $? -ne 0 ]; then
        echo "\n${red}${e_spacer} Error during instalation ${e_spacer}${reset}\n"
        exit 1
    fi

    echo "\n${green}${h_spacer} Node dependencies installed ${h_spacer}${reset}\n"
}

case $1 in

setup)
    next_setup
    ;;

development)
    exec yarn dev
    ;;

production)
    exec yarn start
    ;;

*)
    exec "$@"
    ;;

esac

exit 0
