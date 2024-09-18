'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { Loader2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './logo'

export default function DragDropFile() {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        setFiles(prevFiles => [...prevFiles, ...droppedFiles])
    }

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            setFiles(() => [...selectedFiles])
        }
    }

    const removeFile = (fileToRemove: File) => {
        setFiles(files.filter(file => file !== fileToRemove))
    }

    const UploadAndSignDocument = () => {
        try {
            setIsLoading(true);
            if (!files.length) return;
            alert('hhh')
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    return (
        <Card className="drop-shadow-lg">
            <CardHeader>
                <CardTitle>
                    <Logo />
                </CardTitle>
                <CardDescription>Deploy you document for verifiable authentication</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full max-w-md mx-auto p-6">
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
                            }`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileInput}
                            accept='application/pdf'
                            className="hidden"
                            aria-label="File upload"
                        />
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            Drag and drop files here, or{' '}
                            <button
                                onClick={openFileDialog}
                                className="text-primary hover:text-primary-dark focus:outline-none focus:underline"
                            >
                                browse
                            </button>{' '}
                            to select files
                        </p>
                    </div>
                    {files.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
                            <ul className="space-y-2">
                                {files.map((file, index) => (
                                    <li key={index} title={file.name} className="flex flex-col justify-between p-2 rounded">
                                        <div className="flex  items-center justify-between p-2 rounded">

                                            <span className="truncate max-w-[200px]" >{file.name}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFile(file)}
                                                aria-label={`Remove ${file.name}`}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" disabled={isLoading}>Cancel</Button>
                <Button disabled={isLoading} onClick={UploadAndSignDocument}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign and Upload
                </Button>
            </CardFooter>
        </Card>
    )
}