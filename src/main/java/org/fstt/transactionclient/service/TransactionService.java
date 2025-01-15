package org.fstt.transactionclient.service;

import org.fstt.transactionclient.models.Transaction;

import org.fstt.transactionclient.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByRib(String rib) {
        return transactionRepository.findByRib(rib);
    }
}





