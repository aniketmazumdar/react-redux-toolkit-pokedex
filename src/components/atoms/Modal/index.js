import Dialog from '@mui/material/Dialog';


export const Modal = (props) => {
    const { childcomp, size = 'md', isOpen = true, classes = '' } = props;

    return (
        <>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                maxWidth={size}
                width={'100%'}
                className={classes}
                {...props}
            >
                <div className='modal-container' {...props}>
                    {childcomp}
                </div>
            </Dialog>
        </>
    );
}