## Network delegations project

### Running the project
- Clone the repo.
- Run `npm install` (you might need to run `npm install --force` due to project using React 19 which came out recently and some peer dependencies are not supported yet).
- Run `npm run dev`.

You should now be able to run the view the application on `localhost:3000`.

##### If you want to run the production build you must run `npm build` and `npm start`

### Project walkthrough

#### Homepage

##### Navbar (present on all pages)
- `Delegation Analysis` is a link which takes you to the home page.
- `Connect wallet button` which takes you to the wallets page.

##### Network dialog
- Which allows you to `select` a chain (doing so takes you to the details page).
- Also includes the same `Connect wallet button`.


#### Wallets page

##### Wallet providers dialog
- Allows you to connect a wallet (only Keplr is supported).
- Clicking on ledger or trying Keplr without the extension installed throws an `Alert`.
- Connecting a wallet will redirect you to the home page unless you selected a chain, if you selected a chain previously it will take you to the details page.

#### Network details page

##### Network selector dialog
- Allows you to select the available networks for the selected chain.
- By default the first network of the chain will be selected automatically.

##### Network Analysis section
- Shows valuable information to the network such as `apr`, `commission rate` and more.
- If you have a wallet connected it will show the information for the wallet (mocked).
- Using `keplr` if you switch wallets, it will update and show information for the newly chosen wallet.
- You can click on `Total delegations` or `Unique delegators` to go to the `Delegators page`.

#### Delegators page

##### Chain information section
- Shows the `apr`, `calculated monthly revenue` and `unique delegators`.
- Clicking on the `calculated monthly revenue` and `unique delegators` will take you to the `Hourly delegation sums` and `Hourly delegator counts` web pages respectively.

#### Delegators table
- Shows the wallet, the total tokens and price.
- Includes pagination

#### Hourly delegation sums page
- Includes a chart, y-axis includes the sum of tokens, x-axis shows the total hours in a day.
- Interactive tooltips showing relevant information based on closest point.

#### Hourly delegator counts page
- Includes a chart, y-axis includes the number of delegators, x-axis shows the total hours in a day.
- Interactive tooltips showing relevant information based on closest point.

#### Improvements
- Compress the background image because it is 7mb.
- Use scss so I can make use of mixins and define variables / sizes / colours easily.
- I originally started with Tailwind but decided to use CSS to be more precise with the figma designs and hopefully be easier to read. I still have a bit of Tailwind mixed with CSS in this project.
- Persist some state in the local storage. Currently its easier to test because a refresh wipes everything.
- Should have made a git repo and pushed regularly.
- Some components can be more reusable, and stores can be cleaned up a little bit.

#### Limitations
- My algorithm for spreading tokens to delegators doesn't work as expected.
- Better responsiveness, it is useable for mobile but be greatly improved.
- My select component dropdown list is not virtualized which can cause lag on big lists, should have used a package like `react-select`.
- Cannot detect when a user disconnects his wallet from the website.