import React from 'react';

function ClipboardButton({dataToCopyRaw, dataToCopy, customName}) {
    const [copySuccess, setCopySuccess] = React.useState('');
    if(dataToCopyRaw){
        dataToCopy = ''
        Object.keys(dataToCopyRaw).map(user => (
            Object.keys(dataToCopyRaw[user]).map(company => (
                dataToCopy += company + ":\n" + JSON.parse(dataToCopyRaw[user][company].units).join('\n') + '\n'
            ))
        ))
        console.log(dataToCopy)
    }

    const copyToClipboard = async () => {
        try {
            // Текст, который вы хотите скопировать

            await navigator.clipboard.writeText(dataToCopy);

            setCopySuccess('Текст скопирован!');
        } catch (err) {
            setCopySuccess('Ошибка при копировании');
        }
    };

    return (
            <button className='copy_clipboard' onClick={copyToClipboard}>{customName ? customName : 'Copy'}</button>
    );
}

export default ClipboardButton;
