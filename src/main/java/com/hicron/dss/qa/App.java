package com.hicron.dss.qa;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {
            final BrowserType.LaunchOptions launchOptions = new BrowserType.LaunchOptions().setHeadless(false)
                    .setSlowMo(50);
            Browser browser = playwright.chromium().launch(launchOptions);
            Page page = browser.newPage();
            page.navigate("http://playwright.dev");
            page.pause(); // opens Playwright inspector
            System.out.println(page.title());
        }
    }
}
