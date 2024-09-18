"use client";

import React, { createContext, useContext, useState } from 'react';
import { useStorageUpload } from "@thirdweb-dev/react";
import { useWriteContract } from 'wagmi';
import { address, abi } from "../lib/sbt-abi.json";

interface DocumentQuery {
    processingDocument: boolean,
    setProcessingDocument: React.Dispatch<boolean>
}
const DocumentContext = createContext<DocumentQuery>(Object());

export function useDocument() {
    const { mutateAsync: upload } = useStorageUpload();
    const { writeContractAsync } = useWriteContract();
    const { setProcessingDocument, processingDocument } = useContext(DocumentContext);

    const uploadFileToIpfs = async (files: File[]) => {
        const uploadUrls = await upload({
            data: [...files],
            options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
        });
        return uploadUrls;
    };


    const uploadPrintMetaData = async (metaData: string, filename: string) => {
        const uploadUrl = await upload({
            data: [new File([metaData], filename)],
            options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
        });
        return uploadUrl;
    }

    const handlePrintSubmit = async (files: File[]) => {

        try {
            setProcessingDocument(true);

            const ipfsUris = await Promise.all(files.map(async (file) => {
                const fileUri = (await uploadFileToIpfs([file]))[0];

                const metadata = {
                    name: file.name,
                    description: 'description',
                    "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
                    attributes: [
                        {
                            name: 'file-uri',
                            value: fileUri
                        },
                        {
                            name: 'size',
                            value: file.size
                        }

                    ]
                }

                const metaDataUri = await uploadPrintMetaData(JSON.stringify(metadata), `${Date.now()}_${name}`);

                const ipfsURI = metaDataUri[0].split('ipfs/')[1];

                return ipfsURI.substring(0, ipfsURI.length - 1);

            }))

            writeContractAsync({
                abi: abi,
                address: address as `0x{string}`,
                functionName: 'bundleMint',
                args: [
                    ipfsUris
                ],
            }, {
                onSuccess(data) {
                    console.log(data);
                },
            })

        } catch (error) {
            console.log(error);
            // alert(error?.message)
        } finally {
            setProcessingDocument(false);
        }

    }

    return ({
        handlePrintSubmit,
        processingDocument
    });

}

export function DocumentProvider({ children }: { children: React.ReactNode }) {
    const [processingDocument, setProcessingDocument] = useState<boolean>(false);
    return (
        <DocumentContext.Provider value={{
            processingDocument,
            setProcessingDocument
        }}>
            {children}
        </DocumentContext.Provider>
    )
}