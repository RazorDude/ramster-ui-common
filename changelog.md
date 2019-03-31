# 0.0.19
- Added flattenObjectForQuery to requestService. It's now used for get calls.

# 0.0.18
- Fix for the baseRESTService.emptyToNull method - it now correctly returns dates as-is.

# 0.0.17
- Codebase fix.

# 0.0.16
- All BaseRESTService methods now parse empty string params to null.

# 0.0.15
- Fix for the BaseRestService.create method now returns the full response object, instead of {success: true}.

# 0.0.14
- toobelt.getNested return type fix.

# 0.0.13
- BREAKING Moved the base-page.component's globalEventsService.pageLoaded trigger to a separate method - sendPageLoadedEvent. Add "sendPageLoadedEvent" to your page components' onInitMethodNames to achieve the same effect as before.

# 0.0.12
- Added a test folder and a small test app in it.
- Added the dist folder to gitignore.
- Removed the test folder from gitignore.

# 0.0.11
- Removed the excess argument from GlobalEventsService.triggerInitialDataLoad.

# 0.0.10
- Better exports from the main file.

# 0.0.9
- Publishing only the dist folder. Naming changes.

# 0.0.8
- Removed old deps.

# 0.0.7
- Minor tweaks.

# 0.0.6
- The app is now being built using ng-packagr.

# 0.0.5
- Added co to vendor.ts.
- Added a build script to package.json.

# 0.0.4
- Whoops! Forgot to build stuff! Hehe :)

# 0.0.3
- Moved all deps to peerDeps.

# 0.0.2
- BaseLayoutComponent fix.

# 0.0.1
- The initial version.