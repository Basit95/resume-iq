'use client'

export default function PrintReportButton() {
    function handlePrint() {
        window.print()
    }

    return (
        <button onClick={handlePrint} className="btn-primary print:hidden">
            Print / Download PDF
        </button>
    )
}