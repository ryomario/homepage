import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import MenuItem from "./MenuItem";
import logoPlus from './plus.svg';
import { useMenuStore } from "./stores";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";

export default function Menu() {
    const {
        menus,
        addMenu,
        deleteMenu,
        getMenu,
        updateMenu
    } = useMenuStore();
    const [isShowMenuId, setShowMenuId] = useState(null);
    document.addEventListener('click', () => {setShowMenuId(null)});

    const [isShowModalTambah, setShowModalTambah] = useState(false);
    const [validatedFormTambah, setValidatedFormTambah] = useState(false);
    const handleOpenModalTambah = () => {
        setShowModalTambah(true);
    }
    const handleCloseModalTambah = () => {
        setShowModalTambah(false);
        setValidatedFormTambah(false);
    }

    const handleTambahMenu = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            addMenu({
                title: form['tambahMenuNama'].value,
                url: form['tambahMenuURL'].value,
                icon: ''
            }).then(() => {
                handleCloseModalTambah();
            });
            // console.log({
            //     title: form['tambahMenuNama'].value,
            //     url: form['tambahMenuURL'].value,
            //     icon: ''
            // });
        }

        setValidatedFormTambah(true);
    }
    const handleOnEditMenuItem = (menuId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (<FormEditMenu menuItem={getMenu(menuId)} onClose={onClose} onEditMenu={updateMenu}/>);
            }
        });
    }
    return (
        <div className="menu-container container-md container-fluid">
            {menus.map(menu => (<MenuItem
                key={menu.id} 
                itemId={menu.id} 
                iconSrc={menu.icon} 
                title={menu.title} 
                href={menu.url} 
                isShowMenu={isShowMenuId == menu.id} 
                setShowMenuId={setShowMenuId}
                onDelete={deleteMenu}
                onEdit={handleOnEditMenuItem}
            />))}
            <MenuItem iconSrc={logoPlus} title="Tambah menu" onClick={handleOpenModalTambah} isShowMenu={false} setShowMenuId={setShowMenuId}/>

            {/* Modal tambah menu */}
            <Modal show={isShowModalTambah} onHide={handleCloseModalTambah} restoreFocus data-bs-theme="dark" contentClassName="bg-dark">
                <Form noValidate validated={validatedFormTambah} onSubmit={handleTambahMenu}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah menu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <FloatingLabel className="mb-3" label="Nama" controlId="tambahMenuNama">
                                <Form.Control
                                    required
                                    type="text"
                                    name="tambahMenuNama"
                                    placeholder="Nama"
                                    autoFocus
                                />
                                <Form.Control.Feedback type="invalid">Masukkan nama menu</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" label="URL" controlId="tambahMenuURL">
                                <Form.Control
                                    required
                                    type="text"
                                    name="tambahMenuURL"
                                    placeholder="URL"
                                />
                                <Form.Control.Feedback type="invalid">Masukkan URL menu</Form.Control.Feedback>
                            </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModalTambah}>Batal</Button>
                        <Button variant="primary" type="submit">Tambah</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

const FormEditMenu = ({menuItem, onClose, onEditMenu}) => {
    const [validatedForm, setValidatedForm] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            onEditMenu(menuItem.id,{
                title: form['ubahMenuNama'].value,
                url: form['ubahMenuURL'].value
            }).then(() => {
                onClose();
            });
        }

        setValidatedForm(true);
    }
    return (
        <Modal show onHide={onClose} data-bs-theme="dark" contentClassName="bg-dark">
            <Form noValidate validated={validatedForm} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Ubah menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <FloatingLabel className="mb-3" label="Nama" controlId="ubahMenuNama">
                            <Form.Control
                                required
                                type="text"
                                name="ubahMenuNama"
                                placeholder="Nama"
                                defaultValue={menuItem.title}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">Masukkan nama menu</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="URL" controlId="ubahMenuURL">
                            <Form.Control
                                required
                                type="text"
                                name="ubahMenuURL"
                                placeholder="URL"
                                defaultValue={menuItem.url}
                            />
                            <Form.Control.Feedback type="invalid">Masukkan URL menu</Form.Control.Feedback>
                        </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Batal</Button>
                    <Button variant="primary" type="submit">Tambah</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}