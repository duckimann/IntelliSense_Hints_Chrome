/**
 * Read More: https://developer.chrome.com/extensions/api_index
 */
declare module "chrome" {
    /**
     * Required Permission: "alarms"
     */
    namespace alarms {
        interface Alarm {
            name: String;
            scheduledTime: Number;
            periodInMinutes?: Number;
        };
        /**
         * Creates an alarm. Near the time(s) specified by alarmInfo, the onAlarm event is fired. If there is another alarm with the same name (or no name if none is specified), it will be cancelled and replaced by this alarm.
         * @param name - Optional name to identify this alarm. Defaults to the empty string.
         * @param alarmInfo - Describes when the alarm should fire. The initial time must be specified by either when or delayInMinutes (but not both). If periodInMinutes is set, the alarm will repeat every periodInMinutes minutes after the initial event. If neither when or delayInMinutes is set for a repeating alarm, periodInMinutes is used as the default for delayInMinutes.
         */
        function create(name?: String, alarmInfo: {when?: Number, delayInMinutes?: Number, periodInMinutes?: Number}): void;
        /**
         * Retrieves details about the specified alarm.
         * @param name - The name of the alarm to get. Defaults to the empty string.
         */
        function get(name?: String, callback: (alarm: Alarm) => void): void;
        /**
         * Gets an array of all the alarms.
         */
        function getAll(callback: (alarm: Alarm[]) => void): void;
        /**
         * Clears the alarm with the given name.
         * @param name - The name of the alarm to clear. Defaults to the empty string.
         */
        function clear(name?: String, callback?: (wasCleared: Boolean) => void): void;
        /**
         * Clears all alarms.
         */
        function clearAll(callback?: (wasCleared: Boolean) => void): void;
        namespace onAlarm {
            function addListener(callback: (alarm: Alarm) => void): void;
        }
    }
    /**
     * Required permission: "bookmarks"
     */
    namespace bookmarks {
		interface BookmarkTreeNode {
			id: String;
			parentId?: String;
			index?: Number;
			url?: String;
			title: String;
			dateAdded?: Number;
			dateGroupModified?: Number;
			unmodifiable?: "managed";
			children?: BookmarkTreeNode[];
		};
        /**
         * Retrieves the specified BookmarkTreeNode(s).
         * @param idOrIdList - A single string-valued id, or an array of string-valued ids
         */
        function get(idOrIdList: String | String[], callback: (results: BookmarkTreeNode[]) => void): void;
        /**
         * Retrieves the children of the specified BookmarkTreeNode id.
         */
        function getChildren(id: String, callback: (results: BookmarkTreeNode[]) => void): void;
        /**
         * Retrieves the recently added bookmarks.
         * @param numberOfItems - The maximum number of items to return.
         */
        function getRecent(numberOfItems: Number, callback: (results: BookmarkTreeNode[]) => void): void;
        /**
         * Retrieves the entire Bookmarks hierarchy.
         */
        function getTree(callback: (results: BookmarkTreeNode[]) => void): void;
        /**
         * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
         * @param id - The ID of the root of the subtree to retrieve.
         */
        function getSubTree(id: String, callback: (results: BookmarkTreeNode[]) => void): void;
        /**
         * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
         * @param query - Either a string of words and quoted phrases that are matched against bookmark URLs and titles, or an object. If an object, the properties query, url, and title may be specified and bookmarks matching all specified properties will be produced.
         */
        function search(query: String | {url?: String, title?: String}, callback: (results: BookmarkTreeNode[]) => void): void;
        /**
         * Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.
         */
        function create(bookmark: {parentId?: String, index?: Number, title?: String, url?: String}, callback?: (results: BookmarkTreeNode) => void): void;
        /**
         * Moves the specified BookmarkTreeNode to the provided location.
         */
        function move(id: String, destination: {parentId?: String, index?: Number}, callback?: (results: BookmarkTreeNode) => void): void;
        /**
         * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. Note: Currently, only 'title' and 'url' are supported.
         */
        function update(id: String, changes: {title?: String, url?: String}, callback?: (results: BookmarkTreeNode) => void): void;
        /**
         * Removes a bookmark or an empty bookmark folder.
         */
        function remove(id: String, callback?: () => void): void;
        /**
         * Recursively removes a bookmark folder.
         */
        function removeTree(id: String, callback?: () => void): void;
        namespace onCreated {
            /**
             * Fired when a bookmark or folder is created.
             */
            function addListener(callback: (id: String, bookmark: BookmarkTreeNode) => void): void;
        }
        namespace onRemoved {
            /**
             * Fired when a bookmark or folder is removed. When a folder is removed recursively, a single notification is fired for the folder, and none for its contents.
             */
            function addListener(callback: (id: String, removeInfo: {}) => void): void;
        }
        namespace onChanged {
            /**
             * Fired when a bookmark or folder changes. Note: Currently, only title and url changes trigger this.
             */
            function addListener(callback: (id: String, changeInfo: {}) => void): void;
        }
        namespace onMoved {
            /**
             * Fired when a bookmark or folder is moved to a different parent folder.
             */
            function addListener(callback: (id: String, moveInfo: {}) => void): void;
        }
        namespace onChildrenReordered {
            /**
             * Fired when the children of a folder have changed their order due to the order being sorted in the UI. This is not called as a result of a move().
             */
            function addListener(callback: (id: String, reorderInfo: {}) => void): void;
        }
        namespace onImportBegan {
            /**
             * Fired when a bookmark import session is begun. Expensive observers should ignore onCreated updates until onImportEnded is fired. Observers should still handle other notifications immediately.
             */
            function addListener(callback: () => void): void;
        }
        namespace onImportEnded {
            /**
             * Fired when a bookmark import session is ended.
             */
            function addListener(callback: () => void): void;
        }
    }
    /**
     * Manifest: 
     * "browser_action": {
            "default_icon": {                    // optional
                "16": "images/icon16.png",           // optional
            },
            "default_title": "Google Mail",      // optional; shown in tooltip
            "default_popup": "popup.html"        // optional
        },
     */
    namespace browserAction {
        /**
         * Sets the title of the browser action. This title appears in the tooltip.
         */
        function setTitle(details: {title: String, tabId?: Number}, callback?: () => void): void;
        /**
         * Gets the title of the browser action.
         */
        function getTitle(details: {tabId?: Number}, callback?: (result: String) => void): void;
        /**
         * Sets the icon for the browser action. The icon can be specified as the path to an image file, as the pixel data from a canvas element, or as a dictionary of one of those. Either the path or the imageData property must be specified.
         */
        function setIcon(details: {imageData?: Base64 | {}, path?: String | {}, tabId?: Number}, callback?: () => void): void;
        /**
         * Sets the HTML document to be opened as a popup when the user clicks the browser action icon.
         */
        function setPopup(details: {tabId?: Number, popup: String}, callback?: () => void): void;
        /**
         * Gets the HTML document that is set as the popup for this browser action.
         */
        function getPopup(details: {tabId?: Number}, callback: (result: String) => void): void;
        /**
         * Sets the badge text for the browser action. The badge is displayed on top of the icon.
         */
        function setBadgeText(details: {text: String, tabId?: Number}, callback?: () => void): void;
        /**
         * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
         */
        function getBadgeText(details: {tabId?: Number}, callback: (result: String) => void): void;
        /**
         * Sets the background color for the badge.
         * Color in String: "#121212" (Hex color)
         */
        function setBadgeBackgroundColor(details: {tabId?: Number, color: String | Number[]}, callback?: (result: String) => void): void;
        /**
         * Gets the background color of the browser action.
         */
        function getBadgeBackgroundColor(details: {tabId?: Number}, callback: (result: String) => void): void;
        /**
         * Enables the browser action for a tab. Defaults to enabled.
         */
        function enable(tabId?: Number, callback?: () => void): void;
        /**
         * Disables the browser action for a tab.
         */
        function disable(tabId?: Number, callback?: () => void): void;
        namespace onClicked {
            /**
             * Fired when a browser action icon is clicked. Does not fire if the browser action has a popup.
             */
            function addListener(callback: (tab: {}) => void): void;
        }
    }
    /**
     * Required Permission: "browsingData"
     */
    namespace browsingData {
        interface RemovalOptions {
            since?: Number;
            originTypes?: {
                unprotectedWeb?: Boolean,
                protectedWeb?: Boolean,
                extension?: Boolean
            };
            origins?: String[];
            excludeOrigins?: String[];
        };
        interface DataTypeSet {
            appcache?: Boolean;
            cache?: Boolean;
            cacheStorage?: Boolean;
            cookies?: Boolean;
            downloads?: Boolean;
            fileSystems?: Boolean;
            formData?: Boolean;
            history?: Boolean;
            indexedDB?: Boolean;
            localStorage?: Boolean;
            passwords?: Boolean;
            pluginData?: Boolean;
            serviceWorkers?: Boolean;
            webSQL?: Boolean;
        };
        /**
         * Reports which types of data are currently selected in the 'Clear browsing data' settings UI. Note: some of the data types included in this API are not available in the settings UI, and some UI settings control more than one data type listed here.
         */
        function settings(callback: (result: { options: RemovalOptions, dataToRemove: DataTypeSet, dataRemovalPermitted: DataTypeSet }) => void): void;
        /**
         * Clears various types of browsing data stored in a user's profile.
         * @param dataToRemove - The set of data types to remove.
         */
        function remove(options: RemovalOptions, dataToRemove: DataTypeSet, callback?: () => void): void;
        /**
         * Clears websites' appcache data.
         */
        function removeAppcache(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears the browser's cache.
         */
        function removeCache(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears websites' cache storage data.
         */
        function removeCacheStorage(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears the browser's cookies and server-bound certificates modified within a particular timeframe.
         */
        function removeCookies(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears the browser's list of downloaded files (not the downloaded files themselves).
         */
        function removeDownloads(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears websites' file system data.
         */
        function removeFileSystems(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears the browser's stored form data (autofill).
         */
        function removeFormData(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears the browser's history.
         */
        function removeHistory(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears websites' IndexedDB data.
         */
        function removeIndexedDB(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears websites' local storage data.
         */
        function removeLocalStorage(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears plugins' data.
         */
        function removePluginData(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears the browser's stored passwords.
         */
        function removePasswords(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears websites' service workers.
         */
        function removeServiceWorkers(options: RemovalOptions, callback?: () => void): void;
        /**
         * Clears websites' WebSQL data.
         */
        function removeWebSQL(options: RemovalOptions, callback?: () => void): void;
    }
    /**
     * Manifest: 
     * 	"commands": {
            "toggle-feature-foo": {
                "suggested_key": {
                    "default": "Ctrl+Shift+5",
                    "windows": "Ctrl+Shift+Y",
                    "mac": "Command+Shift+Y",
                    "chromeos": "Ctrl+Shift+U",
                    "linux": "Ctrl+Shift+J"
                },
                "description": "Toggle feature foo",
                "global": true
            }
        },
     */
    namespace commands {
		interface Command {
			name?: String;
			description?: String;
			shortcut?: String;
		};
        /**
         * Returns all the registered extension commands for this extension and their shortcut (if active).
         */
        function getAll(callback: (commands: Command[]) => void): void;
        namespace onCommand {
            /**
             * Fired when a registered command is activated using a keyboard shortcut.
             */
            function addListener(callback: (command: String) => void): void;
        }
    }
    /**
     * Required Permission: "contextMenus"
     */
    namespace contextMenus {
        /**
         * Creates a new context menu item. If an error occurs during creation, it may not be detected until the creation callback fires; details will be in chrome.runtime.lastError.
         */
        interface contextProps {
            type?: "normal" | "checkbox" | "radio" | "separator";
            id?: String;
            title?: String;
            checked?: Boolean;
            contexts?: ["all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio" | "launcher" | "browser_action" | "page_action"];
            visible?: Boolean;
            onclick?: (info: {}, tab: {}) => void;
            parentId?: String | Number;
            documentUrlPatterns?: String[];
            targetUrlPatterns?: String[];
            enabled?: Boolean;
        };
        // type sdf = ["normal" | "checkbox" | "radio" | "separator"]
        // function test(props: sdf): void;
        // function create(createProps: contextProps, callback?: () => void): void;
        /**
         * Updates a previously created context menu item.
         * @param id - The ID of the item to update.
         * @param updateProps - The properties to update. Accepts the same values as the contextMenus.create function.
         */
        function update(id: String | Number, updateProps: contextProps, callback?: () => void): void;
        /**
         * Removes a context menu item.
         * @param menuItemId - The ID of the context menu item to remove.
         */
        function remove(menuItemId: String | Number, callback?: () => void): void;
        /**
         * Removes all context menu items added by this extension.
         */
        function removeAll(callback?: () => void): void;
        namespace onClicked {
            /**
             * Fired when a context menu item is clicked.
             */
            function addListener(callback: (info: {}, tab: {}) => void): void;
        }
	}
	/**
	 * Required Permission: "cookies"
	 */
    namespace cookies {
		interface Cookie {
			name: String;
			value: String;
			domain: String;
			hostOnly: Boolean;
			path: String;
			secure: Boolean;
			httpOnly: Boolean;
			sameSite: "no_restriction" | "lax" | "strict" | "unspecified";
			session: Boolean;
			expirationDate: Number;
			storeId: String;
		};
        /**
         * Retrieves information about a single cookie. If more than one cookie of the same name exists for the given URL, the one with the longest path will be returned. For cookies with the same path length, the cookie with the earliest creation time will be returned.
         * @param details - Details to identify the cookie being retrieved.
         */
        function get(details: {url: String, name: String, storeId?: String}, callback: (cookie: Cookie) => void): void;
        /**
         * Retrieves all cookies from a single cookie store that match the given information. The cookies returned will be sorted, with those with the longest path first. If multiple cookies have the same path length, those with the earliest creation time will be first.
         * @param details - Information to filter the cookies being retrieved.
         */
        function getAll(details: {url?: String, name?: String, domain?: String, path?: String, secure?: Boolean, session?: Boolean, storeId?: String}, callback: (cookie: Cookie[]) => void): void;
        /**
         * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
         * @param details - Details about the cookie being set.
         */
        function set(details: {url?: String, name?: String, domain?: String, path?: String, secure?: Boolean, session?: Boolean, httpOnly?: Boolean, sameSite?: String, expirationDate?: Number, storeId?: String}, callback: (cookie: Cookie) => void): void;
        /**
         * Deletes a cookie by name.
         * @param details - Information to identify the cookie to remove.
         */
        function remove(details: {url: String, name: String, storeId?: String}, callback?: (details?: {url: String, name: String, storeId: String}) => void): void;
        /**
         * Lists all existing cookie stores.
         */
        function getAllCookieStores(callback: (cookies: Cookie[]) => void): void;
        namespace onChanged {
            /**
             * Fired when a cookie is set or removed. As a special case, note that updating a cookie's properties is implemented as a two step process: the cookie to be updated is first removed entirely, generating a notification with "cause" of "overwrite" . Afterwards, a new cookie is written with the updated values, generating a second notification with "cause" "explicit".
             */
            function addListener(callback: (changeInfo: {removed: Boolean, cookie: Cookie, cause: "evicted" | "expired" | "explicit" | "expired_overwrite" | "overwrite"}) => void): void;
        }
    }
    /**
     * Required permission: "desktopCapture"
     */
    namespace desktopCapture {
        /**
         * Shows desktop media picker UI with the specified set of sources.
         * @param sources - Set of sources that should be shown to the user. The sources order in the set decides the tab order in the picker.
         * @param targetTab - Optional tab for which the stream is created. If not specified then the resulting stream can be used only by the calling extension. The stream can only be used by frames in the given tab whose security origin matches tab.url. The tab's origin must be a secure origin, e.g. HTTPS.
         */
        function chooseDesktopMedia(sources: ["screen" | "window" | "tab" | "audio"], targetTab?: Number, callback: (streamId: String, options: {}) => void): void;
        /**
         * Hides desktop media picker dialog shown by chooseDesktopMedia().
         * @param desktopMediaRequestId - Id returned by chooseDesktopMedia()
         */
        function cancelChooseDesktopMedia(desktopMediaRequestId: Number): void;
    }
    /**
     * Required Permission: "downloads"
     */
    namespace downloads {
        interface DownloadItem {
            id: Number;
            url: String;
            finalUrl: String;
            referrer: String;
            filename: String;
            incognito: Boolean;
            danger: "file" | "url" | "content" | "uncommon" | "host" | "unwanted" | "safe" | "accepted";
            mime: String;
            startTime: String;
            endTime?: String;
            estimatedEndTime?: String;
            state: "in_progress" | "interrupted" | "complete";
            paused: Boolean;
            canResume: Boolean;
            error?: "FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "FILE_HASH_MISMATCH" | "FILE_SAME_AS_SOURCE" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_BAD_CONTENT" | "SERVER_UNAUTHORIZED" | "SERVER_CERT_PROBLEM" | "SERVER_FORBIDDEN" | "SERVER_UNREACHABLE" | "SERVER_CONTENT_LENGTH_MISMATCH" | "SERVER_CROSS_ORIGIN_REDIRECT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH";
            bytesReceived: Number;
            totalBytes: Number;
            fileSize: Number;
            exists: Boolean;
            byExtensionId?: String;
            byExtensionName?: String;
        };
        /**
         * Download a URL. If the URL uses the HTTP[S] protocol, then the request will include all cookies currently set for its hostname.
         * @param options -What to download and how.
         * @param callback -Called with the id of the new DownloadItem.
         */
        function download(options: { url: String, filename?: String, conflictAction?: "uniquify" | "overwrite" | "prompt", saveAs?: Boolean, method?: "GET" | "POST", headers?: [{}], body?: String }, callback?: (downloadId: Number) => void): void;
        /**
         * Find DownloadItem.
         */
        function search(query: {
            query?: String[],
            startedBefore?: String,
            startedAfter?: String,
            endedBefore?: String,
            endedAfter?: String,
            totalBytesGreater?: Number,
            totalBytesLess?: Number,
            filenameRegex?: String,
            urlRegex?: String,
            finalUrlRegex?: String,
            limit?: Number,
            orderBy?: String[],
            id?: Number,
            url?: String,
            finalUrl?: String,
            filename?: String,
            danger?: "file" | "url" | "content" | "uncommon" | "host" | "unwanted" | "safe" | "accepted",
            mime?: String,
            startTime?: String,
            endTime?: String,
            state?: "in_progress" | "interrupted" | "complete",
            paused?: Boolean,
            error?: "FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "FILE_HASH_MISMATCH" | "FILE_SAME_AS_SOURCE" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_BAD_CONTENT" | "SERVER_UNAUTHORIZED" | "SERVER_CERT_PROBLEM" | "SERVER_FORBIDDEN" | "SERVER_UNREACHABLE" | "SERVER_CONTENT_LENGTH_MISMATCH" | "SERVER_CROSS_ORIGIN_REDIRECT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH",
            bytesReceived: Number,
            totalBytes: Number,
            fileSize: Number,
            exists: Boolean
        }, callback: (results: DownloadItem[]) => void): void;
        /**
         * Pause the download.
         * @param downloadId -The id of the download to pause.
         * @param callback -Called when the pause request is completed.
         */
        function pause(downloadId: Number, callback?: () => void): void;
        /**
         * Resume a paused download.
         * @param downloadId -The id of the download to resume.
         * @param callback -Called when the resume request is completed.
         */
        function resume(downloadId: Number, callback?: () => void): void;
        /**
         * Cancel a download. 
         * @param downloadId -The id of the download to cancel.
         * @param callback -Called when the cancel request is completed.
         */
        function cancel(downloadId: Number, callback?: () => void): void;
        /**
         * Retrieve an icon for the specified download.
         * @param downloadId -The identifier for the download.
         * @param callback -A URL to an image that represents the download.
         */
        function getFileIcon(downloadId: Number, options?: {size?: Number}, callback: (iconUrl: String) => void): void;
        /**
         * Open the downloaded file now if the DownloadItem is complete; otherwise returns an error through runtime.lastError.
         * @param downloadId -The identifier for the downloaded file.
         */
        function open(downloadId: Number): void;
        /**
         * Show the downloaded file in its folder in a file manager.
         * @param downloadId -The identifier for the downloaded file.
         */
        function show(downloadId: Number): void;
        /**
         * Show the default Downloads folder in a file manager.
         */
        function showDefaultFolder(): void;
        /**
         * Erase matching DownloadItem from history without deleting the downloaded file.
         */
        function erase(query: {
            query?: String[],
            startedBefore?: String,
            startedAfter?: String,
            endedBefore?: String,
            endedAfter?: String,
            totalBytesGreater?: Number,
            totalBytesLess?: Number,
            filenameRegex?: String,
            urlRegex?: String,
            finalUrlRegex?: String,
            limit?: Number,
            orderBy?: String[],
            id?: Number,
            url?: String,
            finalUrl?: String,
            filename?: String,
            danger?: "file" | "url" | "content" | "uncommon" | "host" | "unwanted" | "safe" | "accepted",
            mime?: String,
            startTime?: String,
            endTime?: String,
            state?: "in_progress" | "interrupted" | "complete",
            paused?: Boolean,
            error?: "FILE_FAILED" | "FILE_ACCESS_DENIED" | "FILE_NO_SPACE" | "FILE_NAME_TOO_LONG" | "FILE_TOO_LARGE" | "FILE_VIRUS_INFECTED" | "FILE_TRANSIENT_ERROR" | "FILE_BLOCKED" | "FILE_SECURITY_CHECK_FAILED" | "FILE_TOO_SHORT" | "FILE_HASH_MISMATCH" | "FILE_SAME_AS_SOURCE" | "NETWORK_FAILED" | "NETWORK_TIMEOUT" | "NETWORK_DISCONNECTED" | "NETWORK_SERVER_DOWN" | "NETWORK_INVALID_REQUEST" | "SERVER_FAILED" | "SERVER_NO_RANGE" | "SERVER_BAD_CONTENT" | "SERVER_UNAUTHORIZED" | "SERVER_CERT_PROBLEM" | "SERVER_FORBIDDEN" | "SERVER_UNREACHABLE" | "SERVER_CONTENT_LENGTH_MISMATCH" | "SERVER_CROSS_ORIGIN_REDIRECT" | "USER_CANCELED" | "USER_SHUTDOWN" | "CRASH",
            bytesReceived: Number,
            totalBytes: Number,
            fileSize: Number,
            exists: Boolean
        }, callback?: (erasedIds: Number[]) => void): void;
        /**
         * Remove the downloaded file if it exists and the DownloadItem is complete; otherwise return an error through runtime.lastError.
         */
        function removeFile(downloadId: Number, callback?: () => void): void;
        /**
         * Prompt the user to accept a dangerous download. 
         * @param downloadId -The identifier for the DownloadItem.
         * @param callback -Called when the danger prompt dialog closes.
         */
        function acceptDanger(downloadId: Number, callback?: () => void): void;
        /**
         * Enable or disable the gray shelf at the bottom of every window associated with the current browser profile.
         */
        function setShelfEnabled(enabled: Boolean): void;
        namespace onCreated {
            /**
             * This event fires with the DownloadItem object when a download begins.
             */
            function addListener(callback: (downloadItem: DownloadItem) => void): void;
        }
        namespace onErased {
            /**
             * Fires with the downloadId when a download is erased from history.
             */
            function addListener(callback: (downloadId: Number) => void): void;
        }
        namespace onChanged {
            /**
             * When any of a DownloadItem's properties except bytesReceived and estimatedEndTime changes, this event fires with the downloadId and an object containing the properties that changed.
             */
            function addListener(callback: (downloadDelta: {}) => void): void;
        }
        namespace onDeterminingFilename {
            /**
             * During the filename determination process, extensions will be given the opportunity to override the target DownloadItem.filename.
             */
            function addListener(callback: (downloadItem: DownloadItem, suggest: (suggestion: {filename: String, conflictAction?: "uniquify" | "overwrite" | "prompt"}) => void) => void): void;
        }
    }
    namespace events {
        /**
         * Registers an event listener callback to an event.
         * @param callback -Called when an event occurs. The parameters of this function depend on the type of event.
         */
        function addListener(callback: () => void): void;
        /**
         * Deregisters an event listener callback from an event.
         * @param callback -Listener that shall be unregistered.
         */
        function removeListener(callback: () => void): void;
        /**
         * @param callback -Listener whose registration status shall be tested.
         */
        function hasListener(callback: () => void): void;
        /**
         * @returns Boolean
         */
        function hasListeners();
    }
    /**
     * Required Permission: "gcm"
     */
    namespace gcm {
        /**
         * Registers the application with GCM. The registration ID will be returned by the callback. If register is called again with the same list of senderIds, the same registration ID will be returned.
         * @param senderIds - A list of server IDs that are allowed to send messages to the application. It should contain at least one and no more than 100 sender IDs.
         */
        function register(senderIds: String[], callback: (registrationId: String) => void): void;
        /**
         * Unregisters the application from GCM.
         */
        function unregister(callback: () => void): void;
        /**
         * Sends a message according to its contents.
         * @param message - A message to send to the other party via GCM.
         */
        function send(message: {destinationId: String, messageId: String, timeToLive?: Number, data: {}}, callback: (messageId) => void): void;
        namespace onMessage {
            function addListener(callback: (message: {}) => void): void;
        }
        namespace onMessagesDeleted {
            /**
             * Fired when a GCM server had to delete messages sent by an app server to the application. See Messages deleted event section of Cloud Messaging documentation for details on handling this event.
             */
            function addListener(callback: () => void): void;
        }
        namespace onSendError {
            /**
             * Fired when it was not possible to send a message to the GCM server.
             */
            function addListener(callback: (message: {}) => void): void;
        }
    }
    /**
     * Required Permission: "history"
     */
	namespace history {
        interface HistoryItem {
            id: String;
            url?: String;
            title?: String;
            lastVisitTime?: Number;
            visitCount?: Number;
            typedCount?: Number;
        };
        interface VisitItem {
            id: String;
            visitId: String;
            visitTime: Number;
            referringVisitId: String;
            transition: "link" | "typed" | "auto_bookmark" | "auto_subframe" | "manual_subframe" | "generated" | "auto_toplevel" | "form_submit" | "reload" | "keyword" | "keyword_generated";
        };
        /**
         * Searches the history for the last visit time of each page matching the query.
         */
        function search(query: {text: String, startTime?: Number, endTime?: Number, maxResults?: Number}, callback: (results: HistoryItem[]) => void): void;
        /**
         * Retrieves information about visits to a URL.
         */
        function getVisits(details: {url: String}, callback: (results: VisitItem[]) => void): void;
        /**
         * Adds a URL to the history at the current time with a transition type of "link".
         */
        function addUrl(details: {url: String}, callback?: () => void): void;
        /**
         * Removes all occurrences of the given URL from the history.
         */
        function deleteUrl(details: {url: String}, callback?: () => void): void;
        /**
         * Removes all items within the specified date range from the history. Pages will not be removed from the history unless all visits fall within the range.
         */
        function deleteRange(range: {startTime: Number, endTime: Number}, callback?: () => void): void;
        /**
         * Deletes all items from the history.
         */
        function deleteAll(callback: () => void): void;
        namespace onVisited {
            /**
             * Fired when a URL is visited, providing the HistoryItem data for that URL. This event fires before the page has loaded.
             */
            function addListener(callback: (result: HistoryItem) => void): void;
        }
        namespace onVisitRemoved {
            /**
             * Fired when one or more URLs are removed from the history service. When all visits have been removed the URL is purged from history.
             */
            function addListener(callback: (removed: {allHistory: Boolean, urls?: String[]}) => void): void;
        }
    }
	/**
	 * Manifest: {"manifest_version": 2, "default_locale": "en", "name": "__MSG_extname__" (__MSG_messageName__)}
	 * _locale\en\messages.json
	 * _locale\vi\messages.json
	 * message.json content: {"extname": {"message": "aasdfasdfasdf"}}
	 */
    namespace i18n {
		/**
		 * Gets the accept-languages of the browser. This is different from the locale used by the browser; to get the locale, use i18n.getUILanguage.
		 */
		function getAcceptLanguages(callback: (languageCode) => void): void;
		/**
		 * Gets the localized string for the specified message.
		 * @param messageName - The name of the message, as specified in the messages.json file.
		 * @param substitutions - Up to 9 substitution strings, if the message requires any.
		 * @returns - Message Content
		 */
		function getMessage(messageName: String, substitutions, options?: {}): void;
		/**
		 * Gets the browser UI language of the browser. This is different from i18n.getAcceptLanguages which returns the preferred user languages.
		 * @returns UI Language
		 */
		function getUILanguage(): void;
		/**
		 * Detects the language of the provided text using CLD.
		 * @param text - User input string to be translated.
		 */
		function detectLanguage(text: String, callback: (result: {}) => void): void;
    }
    /**
     * Required Permission: "identity"
     */
    namespace identity {
        interface AccountInfo {id: String;};
        /**
         * Retrieves a list of AccountInfo objects describing the accounts present on the profile.
         */
        function getAccounts(callback: (accounts: AccountInfo[]) => void): void;
        /**
         * Gets an OAuth2 access token using the client ID and scopes specified in the oauth2 section of manifest.json.
         */
        function getAuthToken(details?: {interactive?: Boolean, account: AccountInfo, scopes: String[]}, callback?: (token: String) => void): void;
        /**
         * Retrieves email address and obfuscated gaia id of the user signed into a profile.
         */
        function getProfileUserInfo(callback: (userInfo: {email: String, id: String}) => void): void;
        /**
         * Removes an OAuth2 access token from the Identity API's token cache.
         * @param details -Token information.
         */
        function removeCachedAuthToken(details: {token: String}, callback?: () => void): void;
        /**
         * Starts an auth flow at the specified URL.
         * @param details -WebAuth flow options.
         */
        function launchWebAuthFLow(details: {url: String, interactive?: Boolean}, callback: (responseUrl: String) => void): void;
        /**
         * Generates a redirect URL to be used in |launchWebAuthFlow|.
         * @param path -The path appended to the end of the generated URL.
         */
        function getRedirectURL(path: String): void;
        namespace onSignInChanged {
            /**
             * Fired when signin state changes for an account on the user's profile.
             */
            function addListener(callback: (account: AccountInfo, signedIn: Boolean) => void): void;
        }
    }
    /**
     * Required Permission: "gcm"
     */
    namespace instanceID {
        /**
         * Retrieves an identifier for the app instance. The instance ID will be returned by the callback. The same ID will be returned as long as the application identity has not been revoked or expired.
         */
        function getID(callback: (instanceID: String) => void): void;
        /**
         * Retrieves the time when the InstanceID has been generated. The creation time will be returned by the callback.
         */
        function getCreationTime(callback: (creationTime: Number) => void): void;
        /**
         * Return a token that allows the authorized entity to access the service defined by scope.
         * @param getTokenParams -Parameters for getToken.
         */
        function getToken(getTokenParams: {authorizedEntity: String, scope: String, options?: {}}, callback: (token: String) => void): void;
        /**
         * Revokes a granted token.
         * @param deleteTokenParams -Parameters for deleteToken.
         */
        function deleteToken(deleteTokenParams: {authorizedEntity: String, scope: String}, callback: () => void): void;
        /**
         * Resets the app instance identifier and revokes all tokens associated with it.
         * @param callback -Function called when the deletion completes. The instance identifier was revoked successfully if runtime.lastError is not set.
         */
        function deleteID(callback: () => void): void;
        namespace onTokenRefresh {
            /**
             * Fired when all the granted tokens need to be refreshed.
             */
            function addListener(callback: () => void): void;
        }
    }
    /**
     * Required Permission: "management"
     */
    namespace management {
        interface ExtensionInfo {
            id: String;
            name: String;
            shortName: String;
            description: String;
            version: String;
            versionName?: String;
            mayDisable: Boolean;
            mayEnable?: Boolean;
            enabled: Boolean;
            disabledReason?: "unknown" | "permissions_increase";
            type: "extension" | "hosted_app" | "packaged_app" | "legacy_packaged_app" | "theme" | "login_screen_extension";
            appLaunchUrl?: String;
            homepageUrl?: String;
            offlineEnabled: Boolean;
            optionsUrl: String;
            icons?: [{size: Number, url: String}]; // {"64": "path_to_file"}
            permissions: String[];
            hostPermissions: String[];
            installType: "admin" | "development" | "normal" | "sideload" | "other";
            launchType?: "OPEN_AS_REGULAR_TAB" | "OPEN_AS_PINNED_TAB" | "OPEN_AS_WINDOW" | "OPEN_FULL_SCREEN";
            availableLaunchTypes?: ["OPEN_AS_REGULAR_TAB", "OPEN_AS_PINNED_TAB", "OPEN_AS_WINDOW", "OPEN_FULL_SCREEN"];
        };
        /**
         * Returns a list of information about installed extensions and apps.
         */
        function getAll(callback: (result: ExtensionInfo[]) => void): void;
        /**
         * Returns information about the installed extension, app, or theme that has the given ID.
         * @param id - The ID from an item of management.ExtensionInfo.
         */
        function get(id: String, callback?: (result: ExtensionInfo) => void): void;
        /**
         * Returns information about the calling extension, app, or theme. Note: This function can be used without requesting the 'management' permission in the manifest.
         */
        function getSelf(callback: (result: ExtensionInfo) => void): void;
        /**
         * Returns a list of permission warnings for the given extension id.
         * @param id - The ID of an already installed extension
         */
        function getPermissionWarningsById(id: String, callback: (permissionWarnings: String[]) => void): void;
        /**
         * Returns a list of permission warnings for the given extension manifest string. Note: This function can be used without requesting the 'management' permission in the manifest.
         * @param manifestStr - Extension manifest JSON string.
         */
        function getPermissionWarningsByManifest(manifestStr: String, callback: (permissionWarnings: String[]) => void): void;
        /**
         * Enables or disables an app or extension. In most cases this function must be called in the context of a user gesture (e.g. an onclick handler for a button), and may present the user with a native confirmation UI as a way of preventing abuse.
         * @param id - This should be the id from an item of management.ExtensionInfo.
         * @param enabled - Whether this item should be enabled or disabled.
         */
        function setEnabled(id: String, enabled: Boolean, callback?: () => void): void;
        /**
         * Uninstalls a currently installed app or extension.
         * @param id - This should be the id from an item of management.ExtensionInfo.
         */
        function uninstall(id: String, options?: {showConfirmDialog?: Boolean}, callback?: () => void): void;
        /**
         * Uninstalls the calling extension. Note: This function can be used without requesting the 'management' permission in the manifest.
         */
        function uninstallSelf(options?: {showConfirmDialog?: Boolean}, callback?: () => void): void;
        /**
         * Launches an application.
         * @param id - The extension id of the application.
         */
        function launchApp(id: String, callback: () => void): void;
        /**
         * Display options to create shortcuts for an app. On Mac, only packaged app shortcuts can be created.
         * @param id - This should be the id from an app item of management.ExtensionInfo.
         */
        function createAppShortcut(id: String, callback: () => void): void;
        /**
         * Set the launch type of an app.
         * @param id - This should be the id from an app item of management.ExtensionInfo.
         * @param launchType - The target launch type. Always check and make sure this launch type is in ExtensionInfo.availableLaunchTypes, because the available launch types vary on different platforms and configurations.
         */
        function setLaunchType(id: String, launchType: "OPEN_AS_REGULAR_TAB" | "OPEN_AS_PINNED_TAB" | "OPEN_AS_WINDOW" | "OPEN_FULL_SCREEN", callback: () => void): void;
        /**
         * Generate an app for a URL. Returns the generated bookmark app.
         * @param url - The URL of a web page. The scheme of the URL can only be "http" or "https".
         * @param title - The title of the generated app.
         */
        function generateAppForLink(url: String, title: String, callback?: (result: ExtensionInfo) => void): void;
        /**
         * Checks if the replacement android app can be installed. Errors generated by this API are reported by setting runtime.lastError and executing the function's regular callback.
         */
        function canInstallReplacementAndroidApp(callback: (result: Boolean) => void): void;
        /**
         * Prompts the user to install the replacement Android app from the manifest. Errors generated by this API are reported by setting runtime.lastError and executing the function's regular callback.
         */
        function installReplacementAndroidApp(callback?: () => void): void;
        /**
         * Launches the replacement_web_app specified in the manifest. Prompts the user to install if not already installed.
         */
        function installReplacementWebApp(callback?: () => void): void;
        namespace onInstalled {
            /**
             * Fired when an app or extension has been installed.
             */
            function addListener(callback: (info: ExtensionInfo) => void): void;
        }
        namespace onUninstalled {
            /**
             * Fired when an app or extension has been uninstalled.
             */
            function addListener(callback: (id: String) => void): void;
        }
        namespace onEnabled {
            /**
             * Fired when an app or extension has been enabled.
             */
            function addListener(callback: (info: ExtensionInfo) => void): void;
        }
        namespace onDisabled {
            /**
             * Fired when an app or extension has been disabled.
             */
            function addListener(callback: (info: ExtensionInfo) => void): void;
        }
    }
    /**
     * Required Permission: "notifications"
     */
    namespace notifications {
        interface NotificationOptions {
            type?: "basic" | "image" | "list" | "progress";
            iconUrl?: String;
            title?: String;
            message?: String;
            contextMessage?: String;
            priority?: [-2 | -1 | 0 | 1 | 2];
            eventTime?: Number;
            buttons?: [{title: String, iconUrl?: String}, {title: String, iconUrl?: String}];
            imageUrl?: String;
            progress?: Number; // 0 To 100
            requireInteraction?: Boolean;
            silent?: Boolean;
        };
        /**
         * Creates and displays a notification.
         * @param notificationId -Identifier of the notification. If not set or empty, an ID will automatically be generated.
         * @param options -Contents of the notification.
         * @param callback -Returns the notification id (either supplied or generated) that represents the created notification.
         */
        function create(notificationId?: String, options: NotificationOptions, callback?: (notificationId: String) => void): void;
        /**
         * Updates an existing notification.
         * @param notificationId -The id of the notification to be updated. This is returned by notifications.create method.
         * @param options -Contents of the notification to update to.
         * @param callback -Called to indicate whether a matching notification existed.
         */
        function update(notificationId: String, options: NotificationOptions, callback?: (wasUpdated: Boolean) => void): void;
        /**
         * Clears the specified notification.
         * @param notificationId -The id of the notification to be cleared. This is returned by notifications.create method.
         * @param callback -Called to indicate whether a matching notification existed.
         */
        function clear(notificationId: String, callback?: (wasCleared: Boolean) => void): void;
        /**
         * Retrieves all the notifications.
         * @param callback -Returns the set of notification_ids currently in the system.
         */
        function getAll(callback: (notifications: {}) => void): void;
        /**
         * Retrieves whether the user has enabled notifications from this app or extension.
         * @param callback -Returns the current permission level.
         */
        function getPermissionLevel(callback: (level: "granted" | "denied") => void): void;
        namespace onClosed {
            /**
             * The notification closed, either by the system or by user action.
             */
            function addListener(callback: (notificationId: String, byUser: Boolean) => void): void;
        }
        namespace onClicked {
            /**
             * The user clicked in a non-button area of the notification.
             */
            function addListener(callback: (notificationId: String) => void): void;
        }
        namespace onButtonClicked {
            /**
             * The user pressed a button in the notification.
             */
            function addListener(callback: (notificationId: String, buttonIndex: Number) => void): void;
        }
        namespace onPermissionLevelChanged {
            /**
             * The user changes the permission level. As of Chrome 47, only ChromeOS has UI that dispatches this event.
             */
            function addListener(callback: (level: "granted" | "denied") => void): void;
        }
    }
    /**
     * Manifest: "omnibox": { "keyword" : "aaron" },
     */
    namespace omnibox {
        /**
         * Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.
         * @param suggestion - A partial SuggestResult object, without the 'content' parameter.
         * @param suggestion - The text that is displayed in the URL dropdown. Can contain XML-style markup for styling. The supported tags are 'url' (for a literal URL), 'match' (for highlighting text that matched what the user's query), and 'dim' (for dim helper text). The styles can be nested, eg. dimmed match.
         */
        function setDefaultSuggestion(suggestion: {description: String}): void;
        namespace onInputStarted {
            /**
             * User has started a keyword input session by typing the extension's keyword. This is guaranteed to be sent exactly once per input session, and before any onInputChanged events.
             */
            function addListener(callback: () => void): void;
        }
        namespace onInputChanged {
			interface SuggestResult {
				content: String;
				description: String;
				deletable?: Boolean;
			};
            /**
             * User has changed what is typed into the omnibox.
             */
            function addListener(callback: (text: String, suggest: (suggests: SuggestResult[]) => void) => void): void;
        }
        namespace onInputEntered {
            /**
             * User has accepted what is typed into the omnibox.
             */
            function addListener(callback: (text: String, disposition: "currentTab" | "newForegroundTab" | "newBackgroundTab") => void): void;
        }
        namespace onInputCancelled {
            /**
             * User has ended the keyword input session without accepting the input.
             */
            function addListener(callback: () => void): void;
        }
        namespace onDeleteSuggestion {
            /**
             * User has deleted a suggested result.
             */
            function addListener(callback: (text: String) => void): void;
        }
    }
    /**
     * Manifest:
     * "page_action": {
            "default_icon": {                    // optional
                "16": "images/icon16.png",           // optional
            },
            "default_title": "Google Mail",      // optional; shown in tooltip
            "default_popup": "popup.html"        // optional
        },
     */
    namespace pageAction {
        /**
         * Shows the page action. The page action is shown whenever the tab is selected.
         * @param tabId -The id of the tab for which you want to modify the page action.
         */
        function show(tabId: Number, callback?: () => void): void;
        /**
         * Hides the page action. Hidden page actions still appear in the Chrome toolbar, but are grayed out.
         * @param tabId -The id of the tab for which you want to modify the page action.
         */
        function hide(tabId: Number, callback?: () => void): void;
        /**
         * Sets the title of the page action. This is displayed in a tooltip over the page action.
         */
        function setTitle(details: {tabId: Number, title: String}, callback?: () => void): void;
        /**
         * Gets the title of the page action.
         */
        function getTitle(details: {tabId: Number}, callback: () => void): void;
        /**
         * Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified.
         */
        function setIcon(details: {tabId: Number, path?: String | {}, iconIndex?: Number, imageData: Base64 | {}}, callback?: () => void): void;
        /**
         * Sets the html document to be opened as a popup when the user clicks on the page action's icon.
         */
        function setPopup(details: {tabId: Number, popup: String}, callback?: () => void): void;
        /**
         * Gets the html document set as the popup for this page action.
         */
        function getPopup(details: {tabId: Number}, callback: () => void): void;
        namespace onClicked {
            /**
             * Fired when a page action icon is clicked. This event will not fire if the page action has a popup.
             */
            function addListener(callback: (tab: {}) => void): void;
        }
    }
    namespace permissions {
        interface Permissions {
            permissions: String[];
            origins: String[];
        };
        /**
         * Gets the extension's current set of permissions.
         */
        function getAll(callback: (permissions: Permissions) => void): void;
        /**
         * Checks if the extension has the specified permissions.
         */
        function contains(permissions: Permissions, callback: (result: Boolean) => void): void;
        /**
         * Requests access to the specified permissions, displaying a prompt to the user if necessary. These permissions must either be defined in the optional_permissions field of the manifest or be required permissions that were withheld by the user.
         */
        function request(permissions: Permissions, callback: (granted: Boolean) => void): void;
        /**
         * Removes access to the specified permissions. If there are any problems removing the permissions, runtime.lastError will be set.
         */
        function remove(permissions: Permissions, callback: (removed: Boolean) => void): void;
        namespace onAdded {
            /**
             * Fired when the extension acquires new permissions.
             */
            function addListener(callback: (permissions: Permissions) => void): void;
        }
        namespace onRemoved {
            /**
             * Fired when access to permissions has been removed from the extension.
             */
            function addListener(callback: (permissions: Permissions) => void): void;
        }
    }
    /**
     * Required Permission: "proxy"
     */
    namespace proxy {
        namespace settings {
            /**
             * Gets the value of a setting.
             * @param details -Which setting to consider.
             */
            function get(details: {incognito?: Boolean}, callback: (details: {value, levelOfControl: "not_controllable" | "controlled_by_other_extensions" | "controllable_by_this_extension" | "controlled_by_this_extension", incognitoSpecific: Boolean}) => void): void;
            /**
             * Sets the value of a setting.
             * @param details -Which setting to change.
             * @param callback -Called at the completion of the set operation.
             */
            function set(details: {value, scope?: "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only"}, callback?: () => void): void;
            /**
             * Clears the setting, restoring any default value.
             * @param details -Which setting to clear.
             * @param callback -Called at the completion of the clear operation.
             */
            function clear(details: {scope?: "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only"}, callback?: () => void): void;
        }
        namespace onProxyError {
            /**
             * Notifies about proxy errors.
             */
            function addListener(callback: (details: {fatal: Boolean, error: String, details: String}) => void): void;
        }
    }
    namespace runtime {
        interface PlatformInfo {
            os: "mac" | "win" | "android" | "cros" | "linux" | "openbsd";
            arch: "arm" | "x86-32" | "x86-64" | "mips" | "mips64";
            nacl_arch: "arm" | "x86-32" | "x86-64" | "mips" | "mips64";
        };
        interface MessageSender {
            tab?: {};
            frameId?: Number;
            id?: String;
            url?: String;
            nativeApplication?: String;
            tlsChannelId?: String;
        };
        interface Port {
            name: String;
            disconnect: () => void;
            onDisconnect: {};
            onMessage: {};
            postMessage: (message) => void;
            sender?: MessageSender;
        };
        /**
         * Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.
         */
        function getBackgroundPage(callback: (bgPage) => void): void;
        /**
         * Open your Extension's options page, if possible.
         */
        function openOptionsPage(callback?: () => void): void;
        /**
         * Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file.
         * @returns - The manifest details.
         */
        function getManifest(): void;
        /**
         * Converts a relative path within an app/extension install directory to a fully-qualified URL.
         * @param path - A path to a resource within an app/extension expressed relative to its install directory.
         * @returns - A Path
         */
        function getURL(path: String): void;
        /**
         * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
         * @param url - URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
         * @param callback - Called when the uninstall URL is set. If the given URL is invalid, runtime.lastError will be set.
         */
        function setUninstallURL(url: String, callback?: () => void): void;
        /**
         * Reloads the app or extension. This method is not supported in kiosk mode. For kiosk mode, use chrome.runtime.restart() method.
         */
        function reload(): void;
        /**
         * Requests an immediate update check be done for this app/extension.
         */
        function requestUpdateCheck(callback: (status: "throttled" | "no_update" | "update_available", details: {version: String}) => void): void;
        /**
         * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.
         */
        function restart(): void;
        /**
         * Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. 
         * @param seconds - Time to wait in seconds before rebooting the device, or -1 to cancel a scheduled reboot.
         * @param callback - A callback to be invoked when a restart request was successfully rescheduled.
         */
        function restartAfterDelay(seconds: Number, callback?: () => void): void;
        /**
         * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps
         * @param extensionId - The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for web messaging.
         */
        function connect(extensionId: String, connectInfo?: {name?: String, includeTlsChannelId?: Boolean}): void;
        /**
         * Connects to a native application in the host machine. See Native Messaging for more information.
         * @param application - The name of the registered application to connect to.
         */
        function connectNative(application: String): void;
        /**
         * Sends a single message to event listeners within your extension/app or a different extension/app. 
         * @param extensionId - The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
         * @param message - The message to send. This message should be a JSON-ifiable object.
         */
        function sendMessage(extensionId?: String, message, options?: {includeTlsChannelId?: Boolean}, callback?: (response) => void): void;
        /**
         * Send a single message to a native application.
         * @param application - The name of the native messaging host.
         * @param message - The message that will be passed to the native messaging host.
         */
        function sendNativeMessage(application: String, message: {}, responseCallback?: (response) => void): void;
        /**
         * Returns information about the current platform.
         * @param callback - Called with results
         */
        function getPlatformInfo(callback: (platformInfo: PlatformInfo) => void): void;
        /**
         * Returns a DirectoryEntry for the package directory.
         */
        function getPackageDirectoryEntry(callback: (directoryEntry) => void): void;
        namespace onStartup {
            /**
             * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
             */
            function addListener(callback: () => void): void;
        }
        namespace onInstalled {
            /**
             * Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.
             */
            function addListener(callback: (details: {reason: "install" | "update" | "chrome_update" | "shared_module_update", previousVersion?: String, id?: String}) => void): void;
        }
        namespace onSuspend {
            /**
             * Sent to the event page just before it is unloaded.
             */
            function addListener(callback: () => void): void;
        }
        namespace onSuspendCanceled {
            /**
             * Sent after onSuspend to indicate that the app won't be unloaded after all.
             */
            function addListener(callback: () => void): void;
        }
        namespace onUpdateAvailable {
            /**
             * Fired when an update is available, but isn't installed immediately because the app is currently running.
             */
            function addListener(callback: (details: {version: String}) => void): void;
        }
        namespace onConnect {
            /**
             * Fired when a connection is made from either an extension process or a content script (by runtime.connect).
             */
            function addListener(callback: (port: Port) => void): void;
        }
        namespace onConnectExternal {
            /**
             * Fired when a connection is made from another extension (by runtime.connect).
             */
            function addListener(callback: (port: Port) => void): void;
        }
        namespace onConnectNative {
            /**
             * Fired when a connection is made from a native application. Currently only supported on Chrome OS.
             */
            function addListener(callback: (port: Port) => void): void;
        }
        namespace onMessage {
            /**
             * Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage).
             */
            function addListener(callback: ( message, sender: MessageSender, sendResponse: () => void ) => void): void;
        }
        namespace onMessageExternal {
            /**
             * Fired when a message is sent from another extension/app (by runtime.sendMessage). Cannot be used in a content script.
             */
            function addListener(callback: ( message, sender: MessageSender, sendResponse: () => void ) => void): void;
        }
        namespace onRestartRequired {
            /**
             * Fired when an app or the device that it runs on needs to be restarted.
             */
            function addListener(callback: (reason: "app_update" | "os_update" | "periodic") => void): void;
        }
    }
    /**
     * Required Permission: "storage"
     */
    namespace storage {
        namespace sync {
            /**
             * Gets one or more items from storage.
             * @param keys - A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
             */
            function get(keys?: String | String[] | {}, callback: (items: {}) => void): void;
            /**
             * Gets the amount of space (in bytes) being used by one or more items.
             * @param keys - A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
             */
            function getBytesInUse(keys: String | String[], callback: (bytesInUse: Number) => void): void;
            /**
             * Sets multiple items.
             * @param items - An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected. Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
             */
            function set(items: {}, callback?: () => void): void;
            /**
             * Removes one or more items from storage.
             * @param keys - A single key or a list of keys for items to remove.
             */
            function remove(keys: String | String[], callback?: () => void): void;
            /**
             * Removes all items from storage.
             */
            function clear(callback?: () => void): void;
        }
        namespace local {
            /**
             * Gets one or more items from storage.
             * @param keys - A single key to get, list of keys to get, or a dictionary specifying default values (see description of the object). An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
             */
            function get(keys?: String | String[] | {}, callback: (items: {}) => void): void;
            /**
             * Gets the amount of space (in bytes) being used by one or more items.
             * @param keys - A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
             */
            function getBytesInUse(keys: String | String[], callback: (bytesInUse: Number) => void): void;
            /**
             * Sets multiple items.
             * @param items - An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected. Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
             */
            function set(items: {}, callback?: () => void): void;
            /**
             * Removes one or more items from storage.
             * @param keys - A single key or a list of keys for items to remove.
             */
            function remove(keys: String | String[], callback?: () => void): void;
            /**
             * Removes all items from storage.
             */
            function clear(callback?: () => void): void;
        }
        /**
         * Fired when one or more items change.
         */
        namespace onChanged {
            function addListener(callback: (changes: {}, areaName: String) => void): void;
        }
    }
    /**
     * Required permission: "system.cpu"
     */
    namespace system.cpu {
        /**
         * Queries basic CPU information of the system.
         */
        function getInfo(callback: (info: {}) => void): void;
    }
    /**
     * Required permission: "system.memory"
     */
    namespace system.memory {
        /**
         * Get physical memory information.
         */
        function getInfo(callback: (info: {}) => void): void;
    }
    /**
     * Required permission: "system.storage"
     */
    namespace system.storage {
        /**
         * Get the storage information from the system. The argument passed to the callback is an array of StorageUnitInfo objects.
         */
        function getInfo(callback: (info: [{}]) => void): void;
        /**
         * Ejects a removable storage device.
         */
        function ejectDevice(id: String, callback: (result: String) => void): void;
        /**
         * Get the available capacity of a specified |id| storage device. The |id| is the transient device ID from StorageUnitInfo.
         */
        function getAvailableCapacity(id: String, callback: (info: {}) => void): void;
        namespace onAttached {
            /**
             * Fired when a new removable storage is attached to the system.
             */
            function addListener(callback: (info: {}) => void): void;
        }
        namespace onDetached {
            /**
             * Fired when a removable storage is detached from the system.
             */
            function addListener(callback: (id: String) => void): void;
        }
    }
    /**
     * Required Permission: "tabCapture"
     */
    namespace tabCapture {
        interface CaptureInfo {
            tabId: Number;
            status: "pending" | "active" | "stopped" | "error";
            fullscreen: Boolean;
        };
        interface CaptureOptions {
            audio?: Boolean;
            video?: Boolean;
            audioConstrains?: {};
            videoConstrains?: {};
        };
        /**
         * Captures the visible area of the currently active tab. 
         * @param options -Configures the returned media stream.
         * @param callback -Callback with either the tab capture MediaStream or null. null indicates an error has occurred and the client may query chrome.runtime.lastError to access the error details.
         */
        function capture(options: CaptureOptions, callback: (stream) => void): void;
        /**
         * Returns a list of tabs that have requested capture or are being captured, i.e. status != stopped and status != error. This allows extensions to inform the user that there is an existing tab capture that would prevent a new tab capture from succeeding (or to prevent redundant requests for the same tab).
         * @param callback -Callback invoked with CaptureInfo[] for captured tabs.
         */
        function getCapturedTabs(callback: (results: CaptureInfo[]) => void): void;
        /**
         * Creates an off-screen tab and navigates it to the given |startUrl|. Then, capture is started and a MediaStream is returned via |callback|.
         * @param options -Constraints for the capture and returned MediaStream.
         * @param callback -Callback with either the tab capture MediaStream or null. null indicates an error has occurred and the client may query chrome.runtime.lastError to access the error details.
         */
        function captureOffscreenTab(startUrl: String, options: CaptureOptions, callback: (stream) => void): void;
        /**
         * Creates a stream ID to capture the target tab. Similar to chrome.tabCapture.capture() method, but returns a media stream ID, instead of a media stream, to the consumer tab.
         * @param callback -Callback to invoke with the result. If successful, the result is an opaque string that can be passed to the getUserMedia() API to generate a media stream that corresponds to the target tab. The created streamId can only be used once and expires after a few seconds if it is not used.
         */
        function getMediaStreamId(options?: {consumerTabId?: Number, targetTabId?: Number}, callback: (streamId: String) => void): void;
        namespace onStatusChanged {
            /**
             * Event fired when the capture status of a tab changes. This allows extension authors to keep track of the capture status of tabs to keep UI elements like page actions in sync.
             */
            function addListener(callback: (info: CaptureInfo) => void): void
        }
    }
    /**
     * Required Permission: "tabs"
     */
    namespace tabs {
        interface MutedInfo {
            muted: Boolean;
            reason?: "user" | "capture" | "extension";
            extensionId?: String;
        };
        interface Tab {
            id?: Number;
            index?: Number;
            windowId: Number;
            openerTabId?: Number;
            highlighted: Boolean;
            active: Boolean;
            pinned: Boolean;
            audible?: Boolean;
            discarded: Boolean;
            autoDiscardable: Boolean;
            mutedInfo?: MutedInfo;
            url?: String;
            pendingUrl?: String;
            title?: String;
            faviconUrl?: String;
            status?: String;
            incognito?: Boolean;
            width?: Number;
            height?: Number;
            sessionId?: String;
        };
        interface ZoomSettings {
            mode?: "automatic" | "manual" | "disabled";
            scope?: "per-origin" | "per-tab";
            defaultZoomFactor?: Number;
        };
        /**
         * Retrieves details about the specified tab.
         */
        function get(tabId: Number, callback: (tab: Tab) => void): void;
        /**
         * Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example, a background page or popup view).
         */
        function getCurrent(callback: (tab: Tab) => void): void;
        /**
         * Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. For more details, see Content Script Messaging.
         */
        function connect(tabId: Number, connectInfo?: {name?: String, frameId?: Number}): void;
        /**
         * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
         * @param message - The message to send. This message should be a JSON-ifiable object.
         */
        function sendMessage(tabId: Number, message, options?: {frameId?: Number}, responseCallback: (response) => void): void;
        /**
         * Creates a new tab.
         */
        function create(createProps: {windowId?: Number, index?: Number, url?: String, active?: Boolean, pinned?: Boolean, openertabId?: Number}, callback?: (tab: Tab) => void): void;
        /**
         * Duplicates a tab.
         * @param tabId - The ID of the tab to duplicate.
         */
        function duplicate(tabId?: Number, callback?: (tab: Tab) => void): void;
        /**
         * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
         */
        function query(queryInfo: { active?: Boolean, pinned?: Boolean, muted?: Boolean, highlighted?: Boolean, discarded?: Boolean, autoDiscardable?: Boolean, currentWindow?: Boolean, lastFocusedWindow?: Boolean, status?: "loading" | "complete", title?: String, url?: String | String[], windowId?: Number, windowType?: "normal" | "popup" | "panel" | "app" | "devtools", index?: Number }, callback: (result: Tab[]) => void): void;
        /**
         * Highlights the given tabs and focuses on the first of group. Will appear to do nothing if the specified tab is currently active.
         */
        function highlight(hilightInfo: {windowId?: Number, tabs: Number | Number[]}, callback?: (window) => void): void;
        /**
         * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
         * @param tabId - Defaults to the selected tab of the current window.
         */
        function update(tabId?: Number, udpateProps: { url?: String, active?: Boolean, highlighted?: Boolean, pinned?: Boolean, muted?: Boolean, openertabId?: Number, autoDiscardable?: Boolean }, callback?: (tab: Tab) => void): void;
        /**
         * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
         * @param tabIds - The tab ID or list of tab IDs to move.
         */
        function move(tabIds: Number | Number[], moveProps: {windowId?: Number, index: Number}, callback?: (tabs: Tab | Tab[]) => void): void;
        /**
         * Reload a tab.
         * @param tabId - The ID of the tab to reload; defaults to the selected tab of the current window.
         */
        function reload(tabId?: Number, reloadProps?: {bypassCache?: Boolean}, callback?: () => void): void;
        /**
         * Closes one or more tabs.
         * @param tabIds - The tab ID or list of tab IDs to close.
         */
        function remove(tabIds: Number | Number[], callback?: () => void): void;
        /**
         * Detects the primary language of the content in a tab.
         * @param tabId - Defaults to the active tab of the current window.
         */
        function detectLanguage(tabId?: Number, callback: (lang: String) => void): void;
        /**
         * Captures the visible area of the currently active tab in the specified window.
         * @param windowId - The target window. Defaults to the current window.
         * @param options - Details about the format and quality of an image.
         */
        function captureVisibleTab(windowId?: Number, options?: {format?: "jpeg" | "png", quality?: Number}, callback: (dataUrl: String) => void): void;
        /**
         * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc
         * @param tabId - The ID of the tab in which to run the script; defaults to the active tab of the current window.
         * @param details - Details of the script to run. Either the code or the file property must be set, but both may not be set at the same time.
         * @param callback - Called after all the JavaScript has been executed.
         */
        function executeScript(tabId?: Number, details: {code?: String, file?: String, allFrames?: Boolean, frameId?: Number, matchAboutBlank?: Boolean, runAt: "document_start" | "document_end" | "document_idle", cssOrigin?: "author" | "user"}, callback?: (result: []) => void): void;
        /**
         * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
         * @param tabId - The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
         * @param details - Details of the CSS text to insert. Either the code or the file property must be set, but both may not be set at the same time.
         * @param callback - Called when all the CSS has been inserted.
         */
        function insertCSS(tabId?: Number, details: {code?: String, file?: String, allFrames?: Boolean, frameId?: Number, matchAboutBlank?: Boolean, runAt: "document_start" | "document_end" | "document_idle", cssOrigin?: "author" | "user"}, callback?: (result: []) => void): void;
        /**
         * Zooms a specified tab.
         * @param tabId - The ID of the tab to zoom; defaults to the active tab of the current window.
         * @param zoomFactor - The new zoom factor. A value of 0 sets the tab to its current default zoom factor. Values greater than 0 specify a (possibly non-default) zoom factor for the tab.
         * @param callback - Called after the zoom factor has been changed.
         */
        function setZoom(tabId?: Number, zoomFactor: Number, callback?: () => void): void;
        /**
         * Gets the current zoom factor of a specified tab.
         * @param tabId - The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
         * @param callback - Called with the tab's current zoom factor after it has been fetched.
         */
        function getZoom(tabId?: Number, callback: (zoomFactor: Number) => void): void;
        /**
         * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
         * @param tabId - The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
         * @param zoomSettings - Defines how zoom changes are handled and at what scope.
         * @param callback - Called after the zoom settings are changed.
         */
        function setZoomSettings(tabId?: Number, zoomSettings: ZoomSettings, callback?: () => void): void;
        /**
         * Gets the current zoom settings of a specified tab.
         * @param tabId - The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
         * @param callback - Called with the tab's current zoom settings.
         */
        function getZoomSettings(tabId?: Number, callback: (zoomSettings: ZoomSettings) => void): void;
        /**
         * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
         * @param tabId - The ID of the tab to be discarded. If specified, the tab is discarded unless it is active or already discarded. If omitted, the browser discards the least important tab. This can fail if no discardable tabs exist.
         * @param callback - Called after the operation is completed.
         */
        function discard(tabId?: Number, callback?: (tab: Tab) => void): void;
        /**
         * Go foward to the next page, if one is available.
         * @param tabId - The ID of the tab to navigate forward; defaults to the selected tab of the current window.
         */
        function goForward(tabId?: Number, callback?: () => void): void;
        /**
         * Go back to the previous page, if one is available.
         * @param tabId - The ID of the tab to navigate back; defaults to the selected tab of the current window.
         */
        function goBack(tabId?: Number, callback?: () => void): void;
        namespace onCreated {
            /**
             * Fired when a tab is created. Note that the tab's URL may not be set at the time this event is fired, but you can listen to onUpdated events so as to be notified when a URL is set.
             */
            function addListener(callback: (tab: Tab) => void): void;
        }
        namespace onUpdated {
            /**
             * Fired when a tab is updated.
             * @param changeInfo - Lists the changes to the state of the tab that was updated.
             */
            function addListener(callback: (tabId?: Number, changeInfo: { status?: String, url?: String, pinned?: Boolean, audible?: Boolean, discarded: Boolean, autoDiscardable?: Boolean, mutedInfo?: MutedInfo, faviconUrl?: String, title?: String }, tab: Tab) => void): void;
        }
        namespace onMoved {
            /**
             * Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response to the manually-moved tab. This event is not fired when a tab is moved between windows; for details, see tabs.onDetached.
             */
            function addListener(tabId: Number, moveInfo: {windowId: Number, fromIndex: Number, toIndex: Number}): void;
        }
        namespace onActivated {
            /**
             * Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events so as to be notified when a URL is set.
             */
            function addListener(callback: (activeInfo: {tabId: Number, windowId: Number}) => void): void;
        }
        namespace onHighlighted {
            /**
             * Fired when the highlighted or selected tabs in a window changes.
             */
            function addListener(callback: (windowId: Number, tabIds: Number[]) => void): void;
        }
        namespace onDetached {
            /**
             * Fired when a tab is detached from a window; for example, because it was moved between windows.
             */
            function addListener(callback: (tabId: Number, detachInfo: {oldWindowId: Number, oldPosition: Number}) => void): void;
        }
        namespace onAttached {
            /**
             * Fired when a tab is attached to a window; for example, because it was moved between windows.
             */
            function addListener(callback: (tabId: Number, atachInfo: {newWindowId: Number, newPosition: Number}) => void): void;
        }
        namespace onRemoved {
            /**
             * Fired when a tab is closed.
             */
            function addListener(callback: (tabId: Number, removeInfo: {windowId: Number, isWindowClosing: Boolean}) => void): void;
        }
        namespace onReplaced {
            /**
             * Fired when a tab is replaced with another tab due to prerendering or instant.
             */
            function addListener(callback: (addedTabId: Number, removedTabId: Number) => void): void;
        }
        namespace onZoomChange {
            /**
             * Fired when a tab is zoomed.
             */
            function addListener(callback: (zoomChangeInfo: {tabId: Number, oldZoomFactor: Number, newZoomFactor: Number, zoomSettings: ZoomSettings}) => void): void;
        }
    }
    /**
     * Required Permission: "webNaviation"
     */
    namespace webNavigation {
        /**
         * Retrieves information about the given frame. A frame refers to an <iframe> or a <frame> of a web page and is identified by a tab ID and a frame ID.
         * @param details - Information about the frame to retrieve information about.
         */
        function getFrame(details: {tabId: Number, frameId: Number}, callback: (details: {}) => void): void;
        /**
         * Retrieves information about all frames of a given tab.
         */
        function getAllFrames(details: {tabId: Number}, callback: (details: [{}]) => void): void;
        namespace onBeforeNavigate {
            /**
             * Fired when a navigation is about to occur.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onCommitted {
            /**
             * Fired when a navigation is committed. The document (and the resources it refers to, such as images and subframes) might still be downloading, but at least part of the document has been received from the server and the browser has decided to switch to the new document.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onDOMContentLoaded {
            /**
             * Fired when the page's DOM is fully constructed, but the referenced resources may not finish loading.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onCompleted {
            /**
             * Fired when a document, including the resources it refers to, is completely loaded and initialized.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onErrorOccurred {
            /**
             * Fired when an error occurs and the navigation is aborted. This can happen if either a network error occurred, or the user aborted the navigation.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onCreatedNavigationTarget {
            /**
             * Fired when a new window, or a new tab in an existing window, is created to host a navigation.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onReferenceFragmentUpdated {
            /**
             * Fired when the reference fragment of a frame was updated. All future events for that frame will use the updated URL.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onTabReplaced {
            /**
             * Fired when the contents of the tab is replaced by a different (usually previously pre-rendered) tab.
             */
            function addListener(callback: (details: {}) => void): void;
        }
        namespace onHistoryStateUpdated {
            /**
             * Fired when the frame's history was updated to a new URL. All future events for that frame will use the updated URL.
             */
            function addListener(callback: (details: {}) => void): void;
        }
    }
    /**
     * Required Permission: "webRequest", "webRequestBlocking"
     */
	namespace webRequest {
        interface BackParams {
            urls: ["<all_urls>" | String];
            types: ["main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "csp_report" | "media" | "websocket" | "other"];
        };
        function handlerBehaviorChanged(callback?: () => void): void;
        namespace onBeforeRequest {
            /**
             * Fired when a request is about to occur.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["blocking" | "requestBody" | "extraHeaders"]): void;
        }
        namespace onBeforeSendHeaders {
            /**
             * Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["requestHeaders" | "blocking" | "extraHeaders"]): void;
        }
        namespace onSendHeaders {
            /**
             * Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired).
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["requestHeaders" | "extraHeaders"]): void;
        }
        namespace onHeadersReceived {
            /**
             * Fired when HTTP response headers of a request have been received.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["blocking" | "responseHeaders" | "extraHeaders"]): void;
        }
        namespace onAuthRequired {
            /**
             * Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["responseHeaders" | "blocking" | "asyncBlocking" | "extraHeaders"]): void;
        }
        namespace onResponseStarted {
            /**
             * Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["responseHeaders" | "extraHeaders"]): void;
        }
        namespace onBeforeRedirect {
            /**
             * Fired when a server-initiated redirect is about to occur.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["responseHeaders" | "extraHeaders"]): void;
        }
        namespace onCompleted {
            /**
             * Fired when a request is completed.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["responseHeaders" | "extraHeaders"]): void;
        }
        namespace onErrorOccurred {
            /**
             * Fired when an error occurs.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams, opt: ["extraHeaders"]): void;
        }
        namespace onActionIgnored {
            /**
             * Fired when an extension's proposed modification to a network request is ignored. This happens in case of conflicts with other extensions.
             */
            function addListener(callback: (details: {}) => void, secondParam: BackParams): void;
        }
    }
	/**
	 * Required Permission: "tabs"
	 * to populate the url, pendingUrl, title, and favIconUrl properties of Tab objects.
	 */
    namespace windows {
		interface Window {
			id?: Number;
			focused: Boolean;
			top?: Number;
			left?: Number;
			width?: Number;
			height?: Number;
			tabs: [];
			type?: "normal" | "popup" | "panel" | "app" | "devtools";
			state?: "normal" | "minimized" | "maximized" | "fullscreen";
			alwaysOnTop: Boolean;
			sessionId?: String;
		};
		/**
		 * Gets details about a window.
		 */
		function get(windowId: Number, getInfo: {populate?: Boolean, windowTypes?: Array<Window>}, callback: (window: Window) => void): void;
		/**
		 * Gets the current window.
		 */
		function getCurrent(getInfo: {populate?: Boolean, windowTypes?: Array<Window>}, callback: (window: Window) => void): void;
		/**
		 * Gets the window that was most recently focused — typically the window 'on top'.
		 */
		function getLastFocused(getInfo: {populate?: Boolean, windowTypes?: Array<Window>}, callback: (window: Window) => void): void;
		/**
		 * Gets all windows.
		 */
		function getAll(getInfo: {populate?: Boolean, windowTypes?: Array<Window>}, callback: (window: Window) => void): void;
		/**
		 * Creates (opens) a new browser window with any optional sizing, position, or default URL provided.
		 */
		function create(
			createData?: {
				url?: String | String[],
				tabId?: Number,
				left?: Number,
				top?: Number,
				width?: Number,
				height?: Number,
				focused?: Boolean,
				incognito?: Boolean,
				type?: "normal" | "popup" | "panel",
				state?: "normal" | "minimized" | "maximized" | "fullscreen",
				setSelfAsOpener?: Boolean
			},
			callback?: (window: Window) => void
		): void;
		/**
		 * Updates the properties of a window. Specify only the properties that to be changed; unspecified properties are unchanged.
		 */
		function update(
			windowId: Number,
			updateInfo?: {
				left?: Number,
				top?: Number,
				width?: Number,
				height?: Number,
				focused?: Boolean,
				drawAttention?: Boolean,
				state?: "normal" | "minimized" | "maximized" | "fullscreen",
			},
			callback?: (window: Window) => void
		): void;
		/**
		 * Removes (closes) a window and all the tabs inside it.
		 */
		function remove(windowId: Number, callback?: () => void): void;
		namespace onCreated {
			/**
			 * Fired when a window is created.
			 */
			function addListener(callback: (window: Window) => void): void;
		}
		namespace onRemoved {
			/**
			 * Fired when a window is removed (closed).
			 */
			function addListener(callback: (windowId: Number) => void): void;
		}
		namespace onFocusChanged {
			/**
			 * Fired when the currently focused window changes. Returns chrome.windows.WINDOW_ID_NONE if all Chrome windows have lost focus. Note: On some Linux window managers, WINDOW_ID_NONE is always sent immediately preceding a switch from one Chrome window to another.
			 */
			function addListener(callback: (windowId: Number) => void): void;
		}
	}
}
