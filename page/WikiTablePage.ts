import {Locator} from "@playwright/test";
import {BasePage} from "./BasePage";
import {Operator} from "../domain/Operator";

export class WikiTablePage extends BasePage {
    readonly tableRow: Locator
    private airlineCell: string = 'td:nth-of-type(1)'
    readonly ordersCell: string = 'td:nth-of-type(2)'
    readonly deliveriesCell: string = 'td:nth-of-type(3)'
    readonly inOperation: string = 'td:nth-of-type(4)'

    constructor(page) {
        super(page)
        this.tableRow = page.locator('.wikitable tbody tr')
    }

    async getOperators(): Promise<Operator[]> {
        const operators: Operator[] = []
        const numberOfRows: number = await this.tableRow.count()
        for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
            let row: Locator = await this.tableRow.nth(rowNumber)
            let operator: Operator = new Operator(await this.getAirlineFromRow(row), await this.getOrdersFromRow(row),
                await this.getDeliveriesFromRow(row), await this.getInOperationFromRow(row))
            operators.push(operator)
        }
        return operators
    }

    private async getAirlineFromRow(row: Locator): Promise<string> {
        return await row.locator(this.airlineCell).innerText()
    }

    private async getOrdersFromRow(row: Locator): Promise<number> {
        return this.getNumberFromSubElement(row, this.ordersCell)
    }

    private async getDeliveriesFromRow(row: Locator): Promise<number> {
        return this.getNumberFromSubElement(row, this.deliveriesCell)
    }

    private async getInOperationFromRow(row: Locator): Promise<number> {
        return this.getNumberFromSubElement(row, this.inOperation)
    }

    private async getNumberFromSubElement(locator: Locator, selector: string) {
        const parsedInt = parseInt(await locator.locator(selector).innerText())
        return isNaN(parsedInt) ? 0 : parsedInt;
    }
}