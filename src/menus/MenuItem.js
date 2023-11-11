import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";

const menuActionWidth = 100;

export default function MenuItem({itemId, iconSrc, title, onClick, href, isShowMenu, setShowMenuId, onDelete, onEdit}) {
    const [menuPos, setMenuPos] = useState({x:0,y:0});
    const menuActionRef = useRef(null);
    const handleOnRightClick = (event) => {
        event.preventDefault();
        const newPos = {
            x: event.pageX,
            y: event.pageY
        };        
        
        setMenuPos(newPos);
        setShowMenuId(isShowMenu?null:itemId);
    }
    useEffect(() => {
        const viewHeight = window.innerHeight;
        const viewWidth = window.innerWidth;
        const menuHeight = menuActionRef.current?.offsetHeight || 130;
        const menuWidth = menuActionRef.current?.offsetWidth || 100;

        const newPos = {
            x: menuPos.x,
            y: menuPos.y
        };

        // offset right
        if (newPos.x + menuWidth >= viewWidth) newPos.x = newPos.x - menuWidth;
        // offset bottom
        if (newPos.y + menuHeight >= viewHeight) newPos.y = newPos.y - menuHeight;

        // update jika berbeda
        if (menuPos.x !== newPos.x || menuPos.y !== newPos.y) setMenuPos(newPos);
    },[menuPos]);

    const handleEdit = () => {
        setShowMenuId(null);
        onEdit(itemId);
    }

    const handleDelete = () => {
        setShowMenuId(null);
        const action = () => {
            onDelete(itemId);
        }
        confirmAlert({
            title: 'Hapus !',
            message: `Apakah anda yakin ingin menghapus menu "${title}"?`,
            customUI: ({ title, message, onClose }) => (
                <Modal show onHide={onClose} data-bs-theme="dark" contentClassName="bg-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{message}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>Batal</Button>
                        <Button variant="danger" onClick={() => {action();onClose();}}>Hapus</Button>
                    </Modal.Footer>
                </Modal>
            )
        });
        // if(window.confirm(`Hapus menu "${title}"?`)) {
        //     onDelete(itemId);
        // }
    }
    return (
        <div className="menu-item">
            <a className="menu-item-container" href={href} onClick={onClick} onContextMenu={handleOnRightClick}>
                <div className="icon-container">
                    <img src={iconSrc}/>
                </div>
                <span className="menu-item-label">{title}</span>
            </a>
            <Dropdown show={isShowMenu} onClick={(event) => event.stopPropagation()} style={{position: 'fixed', left: menuPos.x, top: menuPos.y}}>
                <Dropdown.Menu renderOnMount ref={menuActionRef} variant="dark" style={{'--bs-dropdown-min-width': menuActionWidth, width: menuActionWidth}}>
                    <Dropdown.Item eventKey="0" onClick={() => {window.location.href = href}}>Buka</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item eventKey="1" onClick={handleEdit}>Ubah</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={handleDelete}>Hapus</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}