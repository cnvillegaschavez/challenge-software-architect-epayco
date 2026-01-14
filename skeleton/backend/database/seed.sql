-- Datos de prueba para desarrollo

INSERT INTO payments (id, user_id, merchant_id, amount, status, method, description, idempotency_key) 
VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440100',
    '550e8400-e29b-41d4-a716-446655440200',
    50000.00,
    'COMPLETED',
    'CREDIT_CARD',
    'Pago de prueba',
    'test_payment_001'
);

INSERT INTO transactions (payment_id, type, amount, success, reference) 
VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001',
    'PAYMENT',
    50000.00,
    true,
    'TXN-TEST-001'
);
