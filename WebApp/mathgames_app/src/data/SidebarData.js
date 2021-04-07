import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';



export const sidebarData_group1 = [
    {
        title: 'Jogos',
        path: '/games',
        icon: <CgIcons.CgGames/>,
        cName: 'nav-text',
    },
    {
        title: 'Torneio',
        path: '/tournament',
        icon: <RiIcons.RiTrophyFill/>,
        cName: 'nav-text',
    },
    {
        title: 'Classificações',
        path: '/podium',
        icon: <GiIcons.GiPodium/>,
        cName: 'nav-text',
    }
]

export const sidebarData_group2 = [
    {
        title: 'Definições',
        path: '/settings',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text',
    },
    {
        title: 'Quem somos',
        path: '/aboutus',
        icon: <BsIcons.BsQuestionCircle/>,
        cName: 'nav-text',
    }
]