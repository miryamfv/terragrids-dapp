import { useEffect, useState } from 'react'
import { endpoints } from '../pages/api/config'
import LoadingSpinner from './loading-spinner'
import ModalDialog from './modal-dialog'
import styles from './terracell-dialog.module.scss'

export default function TerracellDialog({ id, visible, onClose }) {
    const [terracell, setTerracell] = useState()

    useEffect(() => {
        async function fetchTerracell() {
            const terracell = await fetch(endpoints.terracell(id))
            const { asset } = await terracell.json()
            setTerracell(asset)
        }
        if (id) {
            setTerracell()
            fetchTerracell()
        }
    }, [id])

    return (
        <ModalDialog
            visible={visible}
            title={'Terracell'}
            onClose={onClose}>
            <div className={styles.container}>
                {!terracell && <LoadingSpinner />}
                {terracell && <div className={styles.message}>{terracell.name}</div>}
            </div>
        </ModalDialog>
    )
}