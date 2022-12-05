import {expect, test} from '@playwright/test';
import {WikiTablePage} from "../page/WikiTablePage";
import {Operator} from "../domain/Operator";

test('Check number of Airbus 310 operators - with for loop', async ({page}) => {
    await page.goto('https://en.wikipedia.org/wiki/List_of_Airbus_A310_operators');
    const operatorsWikiPage: WikiTablePage = new WikiTablePage(page)
    const operators: Operator[] = await operatorsWikiPage.getOperators()
    expect(operators.length).toEqual(116)
})
