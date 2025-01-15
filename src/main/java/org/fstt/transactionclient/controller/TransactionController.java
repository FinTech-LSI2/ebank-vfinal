package org.fstt.transactionclient.controller;


import jakarta.transaction.Transactional;
import org.fstt.transactionclient.models.Transaction;
import org.fstt.transactionclient.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@Transactional
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/clients/{rib}")
    public List<Transaction> getTransactionsByRib(@PathVariable String rib) {
        return transactionService.getTransactionsByRib(rib);
    }

    @PostMapping("/clients")
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

}
