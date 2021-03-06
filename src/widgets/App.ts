import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import * as css from './styles/app.m.css';
import * as mdc from '../material/styles/material-components-web.m.css';
import Header, { AddAnimationBundle } from './Header';
import AudiobookPlayerContainer from '../containers/AudiobookPlayerContainer';
import SearchContainer from '../containers/SearchContainer';
import BookshelfContainer from '../containers/BookshelfContainer';
import Home from './Home';
import { AudiobookType } from '../interfaces';

export class App extends WidgetBase {
	private _appTitle = 'LibriVox Audiobook Player'

	// TODO: remove in favor of routes
	private _home = true;
	private _search = false;
	private _bookshelf = false;

	private _addBookBundle: AddAnimationBundle;

	private _onAddBook(book: AudiobookType, e: MouseEvent) {
		this._addBookBundle = {
			timestamp: new Date(),
			event: e
		};
		this.invalidate();
	}
		 
	protected render() {
		return v('div', { classes: [css.root, mdc.typography] }, [
			w(Header, {
				title: this._appTitle,
				addingBook: this._addBookBundle,
				onNavigate: (value: string) => {
					switch (value) {
					case 'home':
						this._bookshelf = this._search = false;
						this._home = true;
						break;
					case 'search':
						this._bookshelf = this._home = false;
						this._search = true;
						break;
					case 'bookshelf':
						this._home = this._search = false;
						this._bookshelf = true;
						break;
				}
				this.invalidate();
			}
			}),
			v('div', { classes: [mdc.topAppBar__fixedAdjust, css.main] }, [
				this._search ? w(SearchContainer, { onAddToBookshelf: this._onAddBook }) : null,
				this._bookshelf ? w(BookshelfContainer, { onAddToBookshelf: this._onAddBook }) : null,
				this._home ? w(Home, { title: 'Welcome to LibriVox' }) : null
			]),
			w(AudiobookPlayerContainer, {})
		]);
	}
}

export default App;
