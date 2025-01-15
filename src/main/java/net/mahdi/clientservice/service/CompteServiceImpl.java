package net.mahdi.clientservice.service;


import net.mahdi.clientservice.DTOs.CompteDTO;
import net.mahdi.clientservice.enums.StatusCompte;
import net.mahdi.clientservice.enums.TypeCompte;
import net.mahdi.clientservice.exception.CompteNotFoundException;
import net.mahdi.clientservice.models.Compte;
import net.mahdi.clientservice.models.CompteCourant;
import net.mahdi.clientservice.models.CompteEpargne;
import net.mahdi.clientservice.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CompteServiceImpl implements CompteService {

    @Autowired
    private CompteRepository compteRepository;

    @Override
    public void createAccount(CompteDTO compteDto) {
        Compte compte;
        if ("CURRANT".equalsIgnoreCase(String.valueOf(compteDto.getTypeCompte()))) {
            compte = new CompteCourant();
            ((CompteCourant) compte).setDecouvert(compteDto.getDecouvert());
        } else if ("SAVING".equalsIgnoreCase(String.valueOf(compteDto.getTypeCompte()))) {
            compte = new CompteEpargne();
            ((CompteEpargne) compte).setInteretRate(compteDto.getInteretRate());
        } else {
            throw new IllegalArgumentException("Type de compte non valide : " + compteDto.getTypeCompte());
        }

        compte.setBalance(compteDto.getBalance());
        compte.setCreatedDate(new Date());
        compte.setStatus(StatusCompte.ACTIVATED);  // Default to active
        compte.setTypeCompte(compteDto.getTypeCompte());
        compte.setIdClient(compteDto.getIdClient());
        String rib = generateRib(compte.getId());
        compte.setRib(rib);
        compte = compteRepository.save(compte);

        rib = generateRib(compte.getId());
        compte.setRib(rib);

        compteRepository.save(compte);
    }


    @Override
    public List<Compte> findComptesEpargnes() {
        return compteRepository.findAllByTypeCompte(TypeCompte.SAVING);
    }

    @Override
    public List<Compte> findComptesCourants() {
        return compteRepository.findAllByTypeCompte(TypeCompte.CURRANT);
    }

    @Override
    public Compte findOne(String rib) {
        return compteRepository.findByRib(rib)
                .orElseThrow(() -> new CompteNotFoundException("Compte non trouvé avec le RIB : " + rib));
    }


    @Override
    public boolean activateCompte(String rib) {
        Optional<Compte> compteOptional = compteRepository.findByRib(rib);
        if (compteOptional.isPresent()) {
            Compte compte = compteOptional.get();
            compte.setStatus(StatusCompte.ACTIVATED);
            compteRepository.save(compte);
            return true;
        }
        throw new CompteNotFoundException("Compte non trouvé pour activation avec le RIB : " + rib);
    }

    @Override
    public boolean suspendCompte(String rib) {
        Optional<Compte> compteOptional = compteRepository.findByRib(rib);
        if (compteOptional.isPresent()) {
            Compte compte = compteOptional.get();
            compte.setStatus(StatusCompte.SUSPENDED);
            compteRepository.save(compte);
            return true;
        }
        throw new CompteNotFoundException("Compte non trouvé pour suspension avec le RIB : " + rib);
    }
    // generation des factures aleatoires
    //{ code , montant , num_contrat , nature ,date , status   }
    @Override
    public List<Compte> findAllComptes() {
        return compteRepository.findAll();
    }


    public static String generateRib(Long numCompte) {
        final String CODE_BANQUE = "011 ";
        final String CODE_GUICHET = "780 ";
        final String CLE_RIB = " 96";
        String numCompteStr = String.format("%016d", numCompte);
        return CODE_BANQUE + CODE_GUICHET + numCompteStr + CLE_RIB;

}
}
