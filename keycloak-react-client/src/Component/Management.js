// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { Line } from 'react-chartjs-2';
import { fetchUserData, fetchTransactions } from '../api';
import { useNavigate } from 'react-router-dom';

const Management = () => {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
        const token = localStorage.getItem('access_token'); // Giả sử bạn lưu token trong localStorage

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Chuyển hướng nếu chưa đăng nhập
        }

        const loadData = async () => {
            try {
                const userData = await fetchUserData(token);
                setUser(userData);

                const transactionData = await fetchTransactions(token);
                setTransactions(transactionData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        loadData();
    }, [token, navigate]);

    const chartData = {
        labels: transactions.map(t => t.transactionDate), // Lấy ngày giao dịch
        datasets: [
            {
                label: 'Expenses',
                data: transactions.filter(t => t.transactionType === 'Expense').map(t => t.amount),
                fill: false,
                borderColor: 'red',
                tension: 0.1,
            },
            {
                label: 'Income',
                data: transactions.filter(t => t.transactionType === 'Income').map(t => t.amount),
                fill: false,
                borderColor: 'green',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            {user && (
                <div>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card>
                                <Statistic title="Balance" value={user.balance} prefix="$" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic title="Total Income" value={transactions.filter(t => t.transactionType === 'Income').reduce((acc, t) => acc + t.amount, 0)} prefix="$" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic title="Total Expenses" value={transactions.filter(t => t.transactionType === 'Expense').reduce((acc, t) => acc + t.amount, 0)} prefix="$" />
                            </Card>
                        </Col>
                    </Row>

                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default Management;
