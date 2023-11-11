import { useEffect, useState } from "react";
import { createImageFromInitials } from "./utils";
import { parse } from "url";

const keyStore = 'my-menus';
const keyStoreNextId = keyStore + '-nextId';
const getNextId = () => {
    const nextId = parseInt(localStorage.getItem(keyStoreNextId) || 0);

    localStorage.setItem(keyStoreNextId,nextId + 1);

    return nextId;
}

export const getMenus = () => JSON.parse(localStorage.getItem(keyStore) || '[]');
export const saveMenus = (menus) => localStorage.setItem(keyStore,JSON.stringify(menus));

export const useMenuStore = () => {
    const [menus, setMenus] = useState(getMenus());

    useEffect(() => {
        saveMenus(menus);
    },[menus]);

    const addMenu = async (menu) => {
        menu.id = getNextId();
        menu.icon = createImageFromInitials(150,menu.title);
        if (!parse(menu.url).protocol) menu.url = `http://${menu.url}`;
        setMenus(oldMenus => ([...oldMenus, menu]));
    }
    const getMenu = (id) => {
        if (!id && id != 0) throw new Error('id tidak boleh null');

        const menu = menus.find(m => m.id === id);
        if (!menu) throw new Error('id menu tidak ditemukan');
        return menu;
    }
    const updateMenu = async (id, menu) => {
        if (!id && id != 0) throw new Error('id menu tidak boleh null');

        const mIdx = menus.findIndex(m => m.id === id);
        if (mIdx === -1) throw new Error('id menu tidak ditemukan');

        const oldMenu = menus[mIdx];
        if (menu.title !== oldMenu.title) {
            menu.icon = createImageFromInitials(150,menu.title);
        }
        if (menu.url !== oldMenu.url) {
            if (!parse(menu.url).protocol) menu.url = `http://${menu.url}`;
        }

        // pastikan id menu sama
        if (menu.id !== id) menu.id = id;

        setMenus(oldMenus => oldMenus.map(mMenu => (mMenu.id == id) ? {...mMenu,...menu} : mMenu));
    }
    const deleteMenu = (id) => {
        if (!id && id != 0) throw new Error('id menu tidak boleh null');

        const mIdx = menus.findIndex(m => m.id === id);
        if (mIdx === -1) throw new Error('id menu tidak ditemukan');

        setMenus(oldMenus => [...oldMenus.slice(0,mIdx),...oldMenus.slice(mIdx+1,oldMenus.length)]);
    }

    return ({
        menus,
        addMenu,
        getMenu,
        updateMenu,
        deleteMenu
    });
}