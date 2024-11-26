def modify_file_content(input_file, output_file):
    """
    Reads content from input_file, modifies it, and writes to output_file.
    """
    with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
        for line_number, line in enumerate(infile, start=1):
            # Modify the line (e.g., add line numbers and convert to uppercase)
            modified_line = f"{line_number}: {line.upper()}"
            outfile.write(modified_line)


def file_read_write():
    """
    Main function to handle file reading, modification, and error handling.
    """
    try:
        # Ask the user for file names
        input_file = input("Enter the name of the file to read: ")
        output_file = input("Enter the name of the file to write to: ")

        # Perform the file modification
        modify_file_content(input_file, output_file)

    except FileNotFoundError:
        print("Error: The file you are trying to read does not exist.")
    except PermissionError:
        print("Error: You do not have permission to read/write to this file.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    else:
        print(f"Successfully modified content from '{input_file}' and saved to '{output_file}'.")


# Entry point for the program
if __name__ == "__main__":
    file_read_write()
