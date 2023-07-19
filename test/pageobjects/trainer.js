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

    get editButton() {
        return $('[data-testid="profileContainer"] button');
    }

    get editForm() {
        return $('section form');
    }

    get labelsEditForm() {
        return $$('section form label');
    }

    get inpustEditForm() {
        return $$('section form input');
    }

    get errorMsgEditForm() {
        return $$('section form p');
    }

    get cancelButton() {
        return $('section form button:nth-child(1)');
    }

    get saveButton() {
        return $('section form button:nth-child(2)');
    }

    async CompleteFormEdit (Fname, Lname, DNI, Phone, City) {
        await this.inpustEditForm[0].setValue(Fname);
        await this.inpustEditForm[1].setValue(Lname);
        await this.inpustEditForm[2].setValue(DNI);
        await this.inpustEditForm[3].setValue(Phone);
        await this.inpustEditForm[4].setValue(City);

        await this.saveButton.click();
    }
}

module.exports = new Trainer();