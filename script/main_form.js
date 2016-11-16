/**
 * Created by mfaye1 on 2016-11-16.
 */
"use strict";
const MIN_NB_CAR = 4; // Nombre minimum de caractères dans les champs input de type text

$(function() {
    console.log("DOM construit");
    // Brancher un listener sur l'événement 'submit' sur l'élément <form>
    $('#form_resa').on('submit', valider_formulaire);
});

/* Gestionnaire d'événement avec le parametre event pour pouvoir empécher le submit (au besoin) */
function valider_formulaire(event) {
    console.log('tentative de soumission');
    var formulaire_valide = true; // Arbritraire, on le met à false dès qu'on rencontre un champ invalide

    /**
     * Valider les champs input de type text (première passe pas fine)
     */
    // Pseudo-classe jQuery pour tous les champs input de type text
    $(':text').each(function(){
        if ($(this).val().trim().length < MIN_NB_CAR) {
            // Ajouter la classe error à l'élément input
            $(this).addClass('error');
            // Ajouter un paragraphe de message après l'élément input (si il n'y en a pas déjà)
            if ($(this).parent().find('.error_msg').length == 0) {
                $(this).after('<p class="error_msg">Le champ contient moins de 3 caractères.</p>');
            }
            formulaire_valide = false;
        } else {
            $(this).removeClass('error');
            $(this).parent().find('.error_msg').remove();
        }
    });

    /**
     * Select ville (une ville doit être sélectionnée)
     */
    if ($('select[name="ville"]').children('option:selected').val() == '-1') {
        formulaire_valide = false;
        $('select[name="ville"]').addClass('error');
    } else {
        $('select[name="ville"]').removeClass('error');
    }


    // En conclusion on soumet ou on soumet pas
    if ( ! formulaire_valide) {
        event.preventDefault();
    }

}
