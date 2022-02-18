import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './modules';
import { FaTrash } from "react-icons/fa";
import { Button, Modal, Form, Container } from 'react-bootstrap';
import TopBar from './TopBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setCategoryList, loadCategoryList, Category } from './modules/category';
import { setTransactionList, loadTransactionList, Transaction } from './modules/transactions';


function Home() {
    const categories = useSelector((state: RootState) => state.category);
    const transactions = useSelector((state: RootState) => state.transactions);
    const dispatch = useDispatch();

    const [categoryModal, setCategoryModal] = useState<boolean>(false);
    const [transactionModal, setTransactionModal] = useState<boolean>(false);

    const [category, setCategory] = useState<Category>({
        id: 0,
        label: ""
    });

    const [transaction, setTransaction] = useState<Transaction>({
        id: 0,
        label: "",
        date: "",
        amount: 0,
        categoryId: 0,
    });

    useEffect(() => {
        dispatch(loadCategoryList());
        dispatch(loadTransactionList());
    }, [dispatch])

    const openCategoryModal = () => {
        setCategoryModal(true);
    }

    const handleClose = () => {
        setCategoryModal(false);
    }

    const submitCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const categoryList = categories.concat(category);
        dispatch(setCategoryList(categoryList));
        setCategory({ id: category.id, label: "" });
        setCategoryModal(false);
    }

    const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const maxId = Math.max(...categories.map(i => i.id), 0);
        setCategory({ id: maxId + 1, label: value });
    }

    const removeCategory = (id: number) => {
        const removedCategoryList = categories.filter(item => item.id !== id);
        dispatch(setCategoryList(removedCategoryList));
    }

    const handleTransactionClose = () => {
        setTransactionModal(false);
    }
    const openTransactionModal = () => {
        setTransactionModal(true);
    }
    const changeTransaction = (e: any) => {
        const { name, value } = e.target;
        const maxId = Math.max(...transactions.map(i => i.id), 0);
        setTransaction({
            ...transaction,
            [name]: value,
            id: maxId + 1
        });
    }
    const submitTransaction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const transactionList = transactions.concat(transaction);
        dispatch(setTransactionList(transactionList));
        setTransaction({
            id: transaction.id, label: "", date: "",
            amount: 0,
            categoryId: 0,
        });
        setTransactionModal(false);
    }

    const getCategory = (categoryId: number) => {
        const transCategory = categories.find(item => item.id === Number(categoryId));
        if (transCategory) {
            return transCategory.label;
        } else {
            return "-";
        }
    }

    return (
        <>
            <TopBar />
            <Container>
                <div className="justify-content-between">
                    <div className="width-35 p-10">
                        <div className='justify-content-between'>
                            <h3>Category</h3>
                            <Button variant="success" onClick={openCategoryModal}>Create</Button>
                        </div>
                        <div className="panel-body">
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Label</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.label}</td>
                                            <td><Button variant="danger" onClick={() => removeCategory(item.id)}><FaTrash /></Button> </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="width-65 p-10">
                        <div className='d-flex justify-content-between'>
                            <h3>Trasaction</h3>
                            <Button variant="success" onClick={openTransactionModal}>Create</Button>
                        </div>
                        <div className="panel-body">
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Label</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.label}</td>
                                            <td>{item.date}</td>
                                            <td>{item.amount}</td>
                                            <td>{getCategory(item.categoryId)} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal show={categoryModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Category</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={submitCategory}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Label</Form.Label>
                                <Form.Control type="text" placeholder="Enter label" onChange={changeCategory} required />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal>

                <Modal show={transactionModal} onHide={handleTransactionClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Transaction</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={submitTransaction}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Label</Form.Label>
                                <Form.Control type="text" placeholder="Enter label" onChange={changeTransaction} name="label" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter date" onChange={changeTransaction} name="date" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number" placeholder="Enter label" onChange={changeTransaction} name="amount" required />
                            </Form.Group>
                            <Form.Select aria-label="Default select example" name="categoryId" onChange={changeTransaction} >
                                <option value="">Select Category</option>
                                {categories.map(item => (
                                    <option key={item.id} value={item.id}>{item.label}</option>
                                ))}
                            </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleTransactionClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal>
            </Container>
        </>
    )
}

export default Home;