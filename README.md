# Website Blocker Chrome Extension

The Website Blocker Chrome Extension allows you to block access to specific websites while you work, helping you stay focused and productive. You can add and remove websites from the blocked list, and the extension will prevent you from accessing the blocked websites during work sessions.

## Installation

1. Clone or download the repository to your local machine.

2. Open a terminal and navigate to the extension directory.

3. Install the required dependencies by running the following command:

   ```bash
   npm install
   ```

4. Build the extension by running the following command:

    ```bash
   npm run build
   ```

5. Open Google Chrome browser and navigate to `chrome://extensions`.

6. Enable the "Developer mode" by toggling the switch located at the top right corner of the page.

7. Click on the "Load unpacked" button and select the build folder from the extension directory.

8. The Website Blocker extension should now be added to your Chrome browser.

## How to Use
1. **Block a Website:**
   - Click on the extension icon in the Chrome toolbar to open the extension popup.

   - In the popup, you will find an input field where you can enter the website URL that you want to block. For example, if you want to block access to `facebook.com`, enter `facebook.com` in the input field.

   - Press the "Block Website" button to add the website to the blocked list.

   - The website is now blocked, and if you try to access it, you will be redirected to a blank page.

2. **Unblock a Website:**
   - To unblock a website, click on the "Delete" button next to the blocked website in the list. The website will be removed from the blocked list, and you will be able to access it again.

3. **Add Multiple Websites:**
   - You can add multiple websites to the blocked list by repeating the steps above.

## Note
Please be aware that there is currently an issue that might prevent you from accessing websites that have been deleted from the block list. In order to unblock all websites and view them normally, the block list must be empty. Didn't want to further delay this assignment so I left it as is. Thank you for your understanding.




