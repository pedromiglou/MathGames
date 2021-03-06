import React from 'react';
//import * as IoIcons from 'react-icons/io';
import * as CgIcons from 'react-icons/cg';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as ImIcons from 'react-icons/im';

export const sidebarData_group_nouser = [
    {
        id: 0,
        title: 'Jogos',
        path: '/gamesDashboard',
        icon: <CgIcons.CgGames/>,
        cName: 'nav-text',
    },
    {
        id: 1,
        title: 'Classificações',
        path: '/podium',
        icon: <GiIcons.GiPodium/>,
        cName: 'nav-text',
    }
]


export const sidebarData_group_user = [
    {
        id: 0,
        title: 'Jogos',
        path: '/gamesDashboard',
        icon: <CgIcons.CgGames/>,
        cName: 'nav-text',
    },
    {
        id: 1,
        title: 'Classificações',
        path: '/podium',
        icon: <GiIcons.GiPodium/>,
        cName: 'nav-text',
    },
    {
        id: 2,
        title: 'Torneio',
        path: '/tournaments',
        icon: <RiIcons.RiTrophyFill/>,
        cName: 'nav-text',
    }
]

export const sidebarData_group2 = [
    /*{
        id: 3,
        title: 'Definições',
        path: '/settings',
        icon: <IoIcons.IoMdSettings/>,
        cName: 'nav-text',
    },*/
    {
        id: 3,
        title: 'Quem somos',
        path: '/about',
        icon: <BsIcons.BsQuestionCircle/>,
        cName: 'nav-text',
    }
]

export const sidebarData_group_admin = [
    {
        id: 0,
        title: 'Estatisticas',
        path: '/statistics',
        icon: <ImIcons.ImStatsDots/>,
        cName: 'nav-text',
    },
    {
        id: 1,
        title: 'Jogadores',
        path: '/podium',
        icon: <ImIcons.ImUsers/>,
        cName: 'nav-text',
    }
    /*{
        id: 2,
        title: 'Gerir Torneios',
        path: '/manageTournaments',
        icon: <RiIcons.RiTrophyFill/>,
        cName: 'nav-text',
    }*/
]

