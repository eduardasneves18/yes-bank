"use client";

import { useEffect, useState } from "react";
import Menu from "../menu/menu";
import "./containers.css";
import { LookupField, TextField, NumberField } from "@/app/components/fields/fields";
import { InsertTransactionButton, EditTransactionScreen, DeleteTransaction } from "../buttons/buttons";
import { createTransactionAPI, getTransactionsAPI, deleteTransactionsAPI } from '@/app/services/transaction';
import Modal from "../modal/modal";

interface containerProps {
    type: string;
    classname: string;
}

function ContainerType(typeBox: string, className: string) {
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<string>("PIX");
    const [transactions, setTransactions] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const onChangeTransactionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    const fetchTransactions = async () => {
        const data = await getTransactionsAPI();
        if (data) {
            setTransactions(data);
        }
    };

    const insertTransaction = async (amount: number, type: string, description: string) => {
        if (!description || amount <= 0 || !type) {
            setErrorMessage("Todos os campos devem ser preenchidos corretamente.");
            setIsModalOpen(true);
            setTimeout(closeModal, 3000); 
            return;
        }

        try {
            setErrorMessage("");
            setSuccessMessage("");
            await createTransactionAPI({ amount, type, description });
            fetchTransactions();
            setSuccessMessage("Transação realizada com sucesso!");
            setIsModalOpen(true);
            setTimeout(closeModal, 2000); 
            setDescription("");
            setAmount(0);
            setType("PIX");
        } catch (error) {
            setErrorMessage("Ocorreu um erro ao realizar a transação. Tente novamente.");
            setIsModalOpen(true); 
            setTimeout(closeModal, 3000);
        }
    };

    const handleDeleteTransaction = async (id: number) => {
        await deleteTransactionsAPI(id);
        fetchTransactions();
        setSuccessMessage("Transação excluida com sucesso!");
        setIsModalOpen(true);
        setTimeout(closeModal, 2000);
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    useEffect(() => {
        if (typeBox === 'extrato-detalhado' || typeBox === 'extrato-simplificado') {
            fetchTransactions();
        }
    }, [typeBox]);

    switch (typeBox) {
        case 'welcome':
            return (
                <div className={`container ${className}`}>
                    <h1>Bem-vinda, Eduarda!</h1>
                </div>
            );
        case 'saldo':
            return (
                <div className="container border-normal">
                    <h2>Saldo</h2>
                    <hr />
                    <a>Conta corrente</a>
                    <br />
                    <div className={className}>
                        <a>2450,34 R$</a>
                    </div>
                </div>
            );
        case 'nova-transacao':
            return (
                <div className={`container ${className}`}>
                    <h2>Nova transação</h2>
                    <div className="fields-gap">
                        <TextField
                            id="destinatario"
                            className="text-field"
                            labelDescription="Destinatário"
                            placeholderText="Insira o nome do destinatário"
                            value={description}
                            onChange={onChangeDescription}
                        />
                        <div className="transaction-gap">
                            <div className="grid-fields">
                                <NumberField
                                    id="valor"
                                    className="number-field"
                                    labelDescription="Valor"
                                    placeholderText="00,00"
                                    value={amount}
                                    onChange={onChangeValue}
                                />
                                <LookupField
                                    id="tipo-transacao"
                                    className="lookup-field"
                                    labelDescription="Tipo de transação"
                                    options={["PIX", "TED"]}
                                    placeholderText="Selecione o tipo de transação"
                                    value={type}
                                    onChange={onChangeTransactionType}
                                />
                            </div>
                            <div>
                                <InsertTransactionButton
                                    className="insert-transaction"
                                    title="Fazer transação"
                                    action={() => insertTransaction(amount, type, description)}
                                />
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        message={errorMessage || successMessage}
                        onClose={closeModal}
                        type={errorMessage ? 'error' : 'success'}
                    />
                </div>
            );
        case 'extrato-detalhado':
            return (
                <div className="container border-gradient">
                    <h2>Extrato</h2>
                    <hr />
                    <div className={className}>
                        {transactions.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Tipo de transação</th>
                                        <th scope="col">Destinatário</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr className="extrato-detalhado" key={transaction.id}>
                                            <td>{transaction.type}</td>
                                            <td>{transaction.description}</td>
                                            <td>{transaction.amount}</td>
                                            <td>
                                                <EditTransactionScreen
                                                    className="update-transaction"
                                                    transaction={transaction}
                                                    onUpdate={fetchTransactions}
                                                />
                                            </td>
                                            <td>
                                                <DeleteTransaction
                                                    className="update-transaction"
                                                    transaction={transaction}
                                                    onDelete={() => handleDeleteTransaction(transaction.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhuma transação encontrada.</p>
                        )}
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        message={errorMessage || successMessage}
                        onClose={closeModal}
                        type={errorMessage ? 'error' : 'success'}
                    />
                </div>
            );
        case 'cartao':
            return (
                <div className="container border-gradient-cartao">
                    <h2>Cartão</h2>
                    <hr />
                    <div className={className}>
                        Funcionalidade bloqueada.
                        <br></br>
                        Entre em contato com a central.
                    </div>
                </div>
            );
        case 'menu':
            return (
                <div className={`container ${className}`}>
                    <Menu />
                </div>
            );
        case 'extrato-simplificado':
            return (
                <div className="container border-gradient">
                    <h2>Extrato</h2>
                    <hr />
                    <div className={className}>
                        {transactions.length > 0 ? (
                            <table>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.type} - {transaction.description}</td>
                                            <td></td>
                                            <td>{transaction.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Nenhuma transação encontrada.</p>
                        )}
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        message={errorMessage || successMessage}
                        onClose={closeModal}
                        type={errorMessage ? 'error' : 'success'}
                    />
                </div>
            );
        default:
            return null;
    }
}

export default function Container(props: containerProps) {
    return (
        <>
            {ContainerType(props.type, props.classname)}
        </>
    );
}
