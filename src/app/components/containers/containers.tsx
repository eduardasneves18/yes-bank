"use client";

import { useEffect, useState } from "react";
import Menu from "../menu/menu";
import "./containers.css";
// import { LookupField, TextField, NumberField, DateField, AttachmentField, PasswordField, EmailField } from "@/app/components/fields/fields";
import { InsertTransactionButton, EditTransactionScreen, DeleteTransaction, FilterIcon, Login } from "../buttons/buttons";
import { createTransactionAPI, getTransactionsAPI, deleteTransactionsAPI } from '@/app/services/transaction';
import { Modal } from "../modal/modal";
import { LookupField, TextField, NumberField, DateField, PasswordField, AttachmentField, EmailField } from "yes-bank-components" ;

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setTransaction, updateTransaction } from "@/app/store/transactionSlice";

interface containerProps {
    type: string;
    classname: string;
}

function ContainerType(typeBox: string, className: string) {
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<string>("PIX");
    const [dateTransaction, setDate] = useState<Date>(new Date);
    const [file, setFile] = useState<string>("");
    const [transactions, setTransactions] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Redux
    const dispatch = useDispatch();
    const transaction = useSelector((state) => state.transaction);


    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDescription(value);
        dispatch(updateTransaction({
            description: value,
            data: null,
            type: null,
            value: null,
            file: null
        }));
    };

    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const onChangeTransactionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    const onChangeDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDate(event.target);
    };

    const onChangeFile = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFile(event.target.value);
    };

    const fetchTransactions = async () => {
        const data = await getTransactionsAPI();
        if (data) {
            setTransactions(data);
        }
    };

    const insertTransaction = async (amount: number, type: string, description: string, dateTrasaction: Date, file: string) => {

        if (!description || amount <= 0 || !type) {
            setErrorMessage("Todos os campos devem ser preenchidos corretamente.");
            setIsModalOpen(true);
            setTimeout(closeModal, 3000); 
            return;
        }

        try {
            setErrorMessage("");
            setSuccessMessage("");
            await createTransactionAPI({ amount, type, description, dateTransaction, file });
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
                            <AttachmentField 
                                id={"anexo"} 
                                label={"Anexar comprovante"}
                                className="text-field"
                                placeholder="Insira o nome do destinatário"
                                value={description}
                                onChange={onChangeFile}/>
                            
                            <TextField
                                id="destinatario"
                                className="text-field"
                                label="Nome da transação"
                                placeholder="Insira o nome do destinatário"
                                value={description}
                                onChange={onChangeDescription}
                            />
                            <div className="transaction-gap">
                                <div className="grid-fields">
                                    {/* <LookupField
                                        id="tipo-transacao"
                                        className="lookup-field"
                                        label="Tipo de transação"
                                        options={["Entrada", "Saída"]}
                                        placeholder="Selecione o tipo de transação"
                                        value={type}
                                        onChange={onChangeTransactionType}
                                    /> */}
                                    <LookupField
                                        id="tipo-transacao"
                                        className="lookup-field"
                                        label="Tipo de transação"
                                        options={["PIX", "TED"]}
                                        placeholder="Selecione o tipo de transação"
                                        value={type}
                                        onChange={onChangeTransactionType}
                                    />
                                    <DateField 
                                        id={"data-transacao"} 
                                        label={"Data da transação"}
                                        className="number-field"
                                        placeholder="00,00"
                                        value={amount}
                                        onChange={onChangeDate}
                                    />
                                    <NumberField
                                        id="valor"
                                        className="number-field"
                                        label="Valor"
                                        placeholder="00,00"
                                        value={amount}
                                        onChange={onChangeValue}
                                    />
                                </div>
                                <div>
                                    <InsertTransactionButton
                                        className="insert-transaction"
                                        title="Fazer transação"
                                        action={() => insertTransaction(amount, type, description, dateTransaction, file)}
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
                    <div className="header-extrato">
                        <h2>Extrato</h2>
                        <FilterIcon/>
                    </div>
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
        case 'login':
            return (
                <div className= {className}>
                    <form>
                        <TextField id={"nm-usuario"} label={"Nome de usuário"}></TextField>
                        <PasswordField id={"pswd-usuario"} label={"Nome de usuário"}></PasswordField>
                        <Login className="login"></Login>
                    </form>
                </div>
            );
            case 'register':
                return (
                    <div className="login">
                        <form>
                            <TextField id={"nm-usuario"} label={"Nome de usuário"}></TextField>
                            <PasswordField id={"pswd-usuario"} label={"Nome de usuário"}></PasswordField>
                            <EmailField id={"email-usuario"} label={"Nome de usuário"}></EmailField>
                            <Login className="login"></Login>
                        </form>
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
