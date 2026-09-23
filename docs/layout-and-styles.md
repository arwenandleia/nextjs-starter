# App Wide Layout

- We will create a general layout with a global header and footer. Feel free to modify this as needed
- **NOTE** : Remember to modify `app/layout.tsx` for the changes to actually take effect.

## Modify the root layout file - `app/layout.tsx`

- [ ] Add `suppressHydrationWarning` to the `html` tag for the dark mode theme provider to work correctly. More info [here](https://github.com/shadcn-ui/ui/discussions/6449) and [here](https://github.com/pacocoursey/next-themes)
- [ ] Make sure your fonts that are being passed to the html and the ones from typeset are correct
- [ ] My `body` tag looks something like this. Feel free to ammend as needed. I have purposely not added the `typeset` class to the header and footer as I would like them to have customized styles.

```
<body>
    <GlobalProviders>
        <div className="flex flex-col h-screen no-scrollbar justify-between">
            <RootHeader />
            <main className="max-w-container typeset w-full h-full no-scrollbar">
              {children}
            </main>
            <RootFooter />
        </div>
    </GlobalProviders>
</body>
```
