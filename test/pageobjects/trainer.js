/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
class Trainer {
    get profileButton() {
        return $('[data-testid="container-aside-members"] a[href="/profile"]');
    }

    get logoutButton() {
        return $('[data-testid="container-aside-members"] div div:nth-child(1) a:nth-child(2)');
    }

    get filterTable() {
        return $('input');
    }

    get headersTable() {
        return $$('table thead th');
    }

    get helperTable() {
        return $$('table thead th p');
    }

    get hoursTable() {
        return $$('table tbody tr th');
    }

    get rowsTable() {
        return $$('table tbody tr td');
    }

    get cardsClass() {
        return $$('div .schedule_subscribedClass__RA3Dx');
    }

    get buttonsCards() {
        return $$('div .schedule_subscribedClass__RA3Dx');
    }

    get descriptionsCards() {
        return $$('table tbody p div');
    }
}

module.exports = new Trainer();