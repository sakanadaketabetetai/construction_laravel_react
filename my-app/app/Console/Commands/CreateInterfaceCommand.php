<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class CreateInterfaceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:interface {className : The name of the interface class}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new interface class';

    /**
     * Directory path for interfaces.
     *
     * @const string
     */
    private const INTERFACES_PATH = 'app/Interfaces/';

    /**
     * The class name of the interface to create.
     *
     * @var string
     */
    private string $className;

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->className = Str::studly($this->argument('className'));

        if ($this->className === '') {
            $this->error('The interface class name is invalid. Please provide a valid class name.');
            return;
        }

        $this->createInterfaceClass();
    }

    /**
     * Create the interface class file.
     */
    private function createInterfaceClass(): void
    {
        $directoryPath = $this->getInterfaceDirectoryPath();

        // Create the directory if it doesn't exist
        if (!File::exists($directoryPath)) {
            File::makeDirectory($directoryPath, 0755, true);
        }

        $filePath = $this->getInterfaceFilePath();
        $fileContent = $this->getInterfaceClassTemplate();

        $this->writeFile($filePath, $fileContent);
    }

    /**
     * Get the full file path of the interface class.
     *
     * @return string
     */
    private function getInterfaceFilePath(): string
    {
        return $this->getInterfaceDirectoryPath() . $this->className . '.php';
    }

    /**
     * Get the full directory path for interface classes.
     *
     * @return string
     */
    private function getInterfaceDirectoryPath(): string
    {
        return base_path(self::INTERFACES_PATH);
    }

    /**
     * Get the content of the interface class.
     *
     * @return string
     */
    private function getInterfaceClassTemplate(): string
    {
        return "<?php\n\nnamespace App\\Interfaces;\n\nclass {$this->className}\n{\n    // Implement your interface methods here\n}\n";
    }

    /**
     * Write content to a file, handling existence and errors.
     *
     * @param string $filePath
     * @param string $fileContent
     */
    private function writeFile(string $filePath, string $fileContent): void
    {
        if (File::exists($filePath)) {
            $this->warn("File {$filePath} already exists.");
        } else {
            try {
                File::put($filePath, $fileContent);
                $this->info("Interface {$this->className} created successfully.");
            } catch (\Exception $e) {
                $this->error("Failed to create file: {$filePath}. Error: " . $e->getMessage());
            }
        }
    }
}