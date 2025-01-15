package net.mahdi.clientservice.service;


import net.mahdi.clientservice.DTOs.CompteDTO;
import net.mahdi.clientservice.models.Compte;

import java.util.List;

public interface CompteService {
    void  createAccount(CompteDTO compteDto);

    List<Compte> findComptesEpargnes();
    List<Compte> findComptesCourants();
    Compte findOne(String numCompte);




    boolean activateCompte(String rib);

    boolean suspendCompte(String rib);

    List<Compte> findAllComptes();

}
