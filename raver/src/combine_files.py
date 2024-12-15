import os
from pathlib import Path

def create_combined_file(project_dir, output_file="combined_project_files.txt"):
    """
    Creates a single text file with the content of all files in a project directory.

    Args:
        project_dir (str): The path to the project directory.
        output_file (str): The path to the output text file.
    """
    output_text = ""
    print(f"Starting file traversal in directory: {project_dir}")  # Debug print

    if not os.path.exists(project_dir): # Debug print
        print(f"Error: Directory not found: {project_dir}")
        return

    for root, _, files in os.walk(project_dir):
        print(f"Entering directory: {root}")  # Debug print
        for file in files:
            file_path = Path(root) / file
            print(f"Processing file: {file_path}")  # Debug print
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    output_text += f"---------- {file_path.relative_to(project_dir)} ----------\n"
                    output_text += f.read() + "\n\n"
            except UnicodeDecodeError:
                print(f"Skipping file with non-utf-8 encoding: {file_path}")
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")


    with open(output_file, "w", encoding='utf-8') as outfile:
        outfile.write(output_text)
    print(f"Combined file created at: {output_file}")

if __name__ == "__main__":
    project_directory = "/home/user1/D/Documents/Hemsida/Project 2/raver/src"  # Set your project directory here
    create_combined_file(project_directory)
