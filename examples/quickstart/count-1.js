import { ngettext, msgid, t } from 'c-3po';

function startCount(n){ 
	console.log(t`starting count up to ${n}`);
	for (let i = 0; i <= n; i++) { 
		console.log(ngettext(msgid`${i} tick passed`, `${i} ticks passed`, i)); 
	}
}

startCount(3);